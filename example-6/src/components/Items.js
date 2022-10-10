import Component from '../core/Component.js';

class Items extends Component {
	setup() {
		this.$state = { items: ['item1', 'item2'] };
	}
	template() {
		const { items } = this.$state;
		return `
			<ul>
				${items
					.map(
						(item, index) =>
							`<li>${item}<button class="deleteButton" data-index="${index}">삭제</button></li>`
					)
					.join('')}
			</ul>
      <button class="addButton">추가</button>
    `;
	}
	setEvent() {
		// list 추가 이벤트
		this.addEvent('click', '.addButton', ({ target }) => {
			const { items } = this.$state;
			this.setState({ items: [...items, `item${items.length + 1}`] });
		});

		// list 삭제 이벤트
		this.addEvent('click', '.deleteButton', ({ target }) => {
			const items = [...this.$state.items];
			items.splice(target.dataset.index, 1);
			this.setState({ items: items });
		});
	}
}

export default Items;
