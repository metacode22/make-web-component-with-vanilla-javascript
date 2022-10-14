class Component {
	$target;
	$props;
	$state;
  
	constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.setEvent();
    this.render();
  }
  
  // state 설정
  setup() {}
}
