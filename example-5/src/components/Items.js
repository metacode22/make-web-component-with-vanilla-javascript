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
    // this.$target.querySelector('button).addEventListener가 아니라
    // this.$target.addEventListener이다. 즉 상위 element인 app element에다가 이벤트를 등록하고 있다.
    this.$target.addEventListener('click', ({ target }) => {
      const items = [...this.$state.items];

      if (target.classList.contains('addButton')) {
        this.setState({ items: [...items, `item${items.length + 1}`] });
      }

      if (target.classList.contains('deleteButton')) {
        items.splice(target.dataset.index, 1);
        this.setState({ items: [...items] });
      }
    });
  }
}

export default Items;
