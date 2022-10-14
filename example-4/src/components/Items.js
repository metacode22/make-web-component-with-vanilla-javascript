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
              `<li>${item}<button class="deleteButton" data-index="${index}">삭제</button></li>`,
          )
          .join('')}
      </ul>
      <button class="addButton">추가</button>
    `;
  }
  setEvent() {
    this.$target.querySelector('.addButton').addEventListener('click', () => {
      const { items } = this.$state;
      this.setState({ items: [...items, `item${items.length + 1}`] });
    });

    this.$target.querySelectorAll('.deleteButton').forEach(deleteButton => {
      deleteButton.addEventListener('click', ({ target }) => {
        // items를 나중에 splice 해야 하므로, 그냥 들고 오면 기존 state가 변경된다.
        // 해당 예제에서는 그렇게 돼도 괜찮지만, 만약 다른 곳에서 items라는 state를 사용하고 있다면 예측치 못한 state를 받게 된다.
        // 1, 2, 3을 받을 줄 알았는데 여기서 3이 없어진 1, 2를 받게 되는 것.
        // 따라서 복사를 해준다.
        const items = [...this.$state.items];
        items.splice(target.dataset.index, 1);
        this.setState({ items: [...items] });
      });
    });
  }
}

export default Items;
