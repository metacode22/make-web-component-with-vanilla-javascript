class Component {
	$target;
	$state;

	constructor($target) {
		this.$target = $target;
		this.setup();
		this.render();
		this.setEvent();
	}

	setup() {}
	setEvent() {}
	template() {
		return '';
	}
	render() {
		this.$target.innerHTML = this.template();
	}
	setState(newState) {
		this.$state = { ...this.$state, ...newState };
		this.render();
	}
	// eventType은 click, keydown과 같은 것들
	// selector는 .class, #id, button과 같은 것들
	addEvent(eventType, selector, callback) {
		const children = [...this.$target.querySelectorAll(selector)];
		// selector 보다 더 하위 요소에서 발생한 이벤트로 인한 버블링이라면, target에서 가장 가까운 selector를 찾는다.
		// 밑의 주석된 코드와 같이, 한 번 더 들어간 태그에서 발생한 이벤트의 경우를 처리하기 위해 closest를 사용하는 것 같다.
		// 여기서도 똑같은 click 이벤트가 발생할 수 있으니까!
		// const Items = () => {
		// 	return (
		// 		<>
		// 			<ul>
		// 				<li>
		// 					item1<button className="deleteButton">삭제</button>
		// 				</li>
		// 				<li>
		// 					item2<button className="deleteButton">삭제</button>
		// 					<li>{/* 이렇게 또 타고 들어가서 이벤트가 발생한 경우를 말하는 것 같다.*/}</li>
		// 				</li>
		// 			</ul>
		// 			<button className="addButton">추가</button>
		// 		</>
		// 	);
		// };
		const isTarget = (target) => children.includes(target) || target.closest(selector);
		
		this.$target.addEventListener(eventType, (event) => {
			if (isTarget(event.target)) callback(event);
		})
	}
}

export default Component;
