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

  setup() {}
  setEvent() {}
  mounted() {}
  template() {
    return '';
  }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted(); // render 이후에 mounted에 정의된 함수가 실행된다.
  }
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = target =>
      children.includes(target) || target.closest(selector);

    this.$target.addEventListener(eventType, event => {
      if (isTarget(event.target)) callback(event);
    });
  }
}

export default Component;