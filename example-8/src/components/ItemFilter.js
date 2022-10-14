import Component from '../core/Component.js';

class ItemFilter extends Component {
  template() {
    return `
      <button class="filterButton" data-is-filter="0">전체 보기</button>
      <button class="filterButton" data-is-filter="1">활성 보기</button>
      <button class="filterButton" data-is-filter="2">비활성 보기</button>
    `;
  }

  setEvent() {
    const { filterItem } = this.$props;
    this.addEvent('click', '.filterButton', ({ target }) => {
      filterItem(Number(target.dataset.isFilter));
    });
  }
}

export default ItemFilter;
