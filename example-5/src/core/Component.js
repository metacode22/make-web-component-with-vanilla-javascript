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
}

export default Component;
