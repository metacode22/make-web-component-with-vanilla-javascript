import Component from '../core/Component.js';

class ItemAppender extends Component {
  template() {
    return `<input type="text" class="appender" placeholder="아이템 내용 입력" />`;
  }

  setEvent() {
    // App 컴포넌트에서 addItem이라는 함수가 담긴 객체를 인자로 넘겨주었음.
    const { addItem } = this.$props;
    this.addEvent('keyup', '.appender', ({ key, target }) => {
      if (key !== 'Enter') return;
      addItem(target.value);
    });
  }
}

export default ItemAppender;
