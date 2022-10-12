import Component from '../core/Component.js';

class Items extends Component {
	get filteredItems() {
		const { isFilter, items } = this.$state;
		// isFilter의 값에 따라 active 속성 검사해서 일치하는 것만 보이도록, 즉 필터링하는 로직.
		return items.filter(
			({ active }) =>
				(isFilter === 1 && active) ||
				(isFilter === 2 && !active) ||
				isFilter === 0
		);
	}

	setup() {
		this.$state = {
			// isFilter
			// 0 : 전체 보기
			// 1 : 활성 보기
			// 2 : 비활성 보기
			// 처음엔 전체 보기
			isFilter: 0,
			items: [
				{
					seq: 1,
					contents: 'item1',
					active: false,
				},
				{
					seq: 2,
					contents: 'item2',
					active: true,
				},
			],
		};
	}

	template() {
		return `
			<header>
				<input type="text" class="appender" placeholder="아이템 내용 입력" />
			</header>
			<main>
				<ul>
					${this.filteredItems
						.map(
							({ contents, active, seq }) => `
						<li data-seq="${seq}">
							${contents}
							<button class="toggleButton" style="color: ${active ? '#09F' : '#F09'}">
								${active ? '활성' : '비활성'}
							</button>
							<button class="deleteButton">삭제</button>
						</li>
					`
						)
						.join('')}
				</ul>
			</main>
			<footer>
				<button class="filterButton" data-is-filter="0">전체 보기</button>
				<button class="filterButton" data-is-filter="1">활성 보기</button>
				<button class="filterButton" data-is-filter="2">비활성 보기</button>
			</footer>
		`;
	}

	setEvent() {
		// input 창에서 엔터 키 입력 시 새로운 리스트를 추가하는 이벤트
		// keyup 일 경우 해당 이벤트 발생
		// appender에 의해 일어난 이벤트인지 확인
		// { key, target } 부분은 event를 디스트럭처링한 것.
		this.addEvent('keyup', '.appender', ({ key, target }) => {
			if (key !== 'Enter') return;
			const { items } = this.$state;
			// 순서들 중 가장 큰 값에서 + 1
			const seq = Math.max(0, ...items.map((item) => item.seq)) + 1;
			// input 태그의 value를 가져온다.
			const contents = target.value;
			const active = false;
			this.setState({
				items: [...items, { seq, contents, active }],
			});
		});

		// 리스트 삭제 로직
		this.addEvent('click', '.deleteButton', ({ target }) => {
			const items = [...this.$state.items];
			// data-seq 속성이 존재하면서, 삭제 버튼으로부터 가장 가까운 태그를 찾고 그것의 data-seq 속성 값을 변수에 저장한다.
			const seq = Number(target.closest('[data-seq]').dataset.seq);
			items.splice(
				items.findIndex((item) => item.seq === seq),
				1
			);
			this.setState({ items });
		});

		// 활성/비활성 토글 로직
		this.addEvent('click', '.toggleButton', ({ target }) => {
			const items = [...this.$state.items];
			const seq = Number(target.closest('[data-seq]').dataset.seq);
			const index = items.findIndex((item) => item.seq === seq);
			items[index].active = !items[index].active;
			this.setState({ items });
		});

		// 활성만 혹은 비활성만 필터링하는 로직
		// items를 가져와 실제로 렌더링하는 부분에서는 결국 this.filteredItems를 거친다는 것을 유의하자.
		this.addEvent('click', '.filterButton', ({ target }) => {
			this.setState({ isFilter: Number(target.dataset.isFilter) });
		});
	}
}

export default Items;
