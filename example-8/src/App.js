import Component from './core/Component.js';
import ItemAppender from './components/ItemAppender.js';
import ItemFilter from './components/ItemFilter.js';
import Items from './components/Items.js';

class App extends Component {
  setup() {
    this.$state = {
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
    // 3개로 나뉘어진다. 리스트를 추가하는 곳, 리스트 목록들을 보여주는 곳, 버튼에 따라 리스트 목록들을 필터링시키는 곳
    return `
      <header data-component="item-appender"></header>
      <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `;
  }

  // App이 렌더링될 때 자식 컴포넌트들을 mount시킨다.
  mounted() {
    const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
    const $itemAppender = this.$target.querySelector(
      '[data-component="item-appender"]',
    );
    const $itemFilter = this.$target.querySelector(
      '[data-component="item-filter"]',
    );
    const $items = this.$target.querySelector('[data-component="items"]');

    // 자식 컴포넌트들을 직접적으로 mount 시키는 부분
    // 각 함수들은 결국 App의 Items를 재구성하는 것이기 때문에 App의 것을 바꾸라는 의미로 bind(this)를 하는 것 같다.
    // 아니면 이 App에서 정의된 각 함수들을(addItem, deleteItem 등) 말하는 것 같다.
    new ItemAppender($itemAppender, {
      addItem: addItem.bind(this),
    });

    new ItemFilter($itemFilter, {
      filterItem: filterItem.bind(this),
    });

    new Items($items, {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });
  }

  get filteredItems() {
    const { isFilter, items } = this.$state;
    return items.filter(
      ({ active }) =>
        (isFilter === 1 && active) ||
        (isFilter === 2 && !active) ||
        isFilter === 0,
    );
  }

  addItem(contents) {
    const { items } = this.$state;
    const seq = Math.max(0, ...items.map(item => item.seq)) + 1;
    const active = false;
    this.setState({
      items: [...items, { seq, contents, active }],
    });
  }

  deleteItem(seq) {
    const items = [...this.$state.items];
    items.splice(
      items.findIndex(item => item.seq === seq),
      1,
    );
    this.setState({ items });
  }

  toggleItem(seq) {
    const items = [...this.$state.items];
    const index = items.findIndex(item => item.seq === seq);
    items[index].active = !items[index].active;
    this.setState({ items });
  }

  filterItem(isFilter) {
    this.setState({ isFilter });
  }
}

export default App;
