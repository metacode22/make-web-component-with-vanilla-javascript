import Component from '../core/Component.js';

class Items extends Component {
  template() {
    const { filteredItems } = this.$props;

    return `
      <ul>
        ${filteredItems
          .map(
            ({ contents, active, seq }) => `
          <li data-seq="${seq}">
            ${contents}
            <button class="toggleButton" style="color: ${
              active ? '#09F' : '#F09'
            }">
              ${active ? '활성' : '비활성'}
            </button>
            <button class="deleteButton">삭제</button>
          </li>
        `,
          )
          .join('')}
      </ul>
    `;
  }

  setEvent() {
    const { deleteItem, toggleItem } = this.$props;

    this.addEvent('click', '.deleteButton', ({ target }) => {
      // data-seq 속성이 박힌 가장 가까운 태그를 찾는다.
      deleteItem(Number(target.closest('[data-seq]').dataset.seq));
    });

    this.addEvent('click', '.toggleButton', ({ target }) => {
      toggleItem(Number(target.closest('[data-seq]').dataset.seq));
    });
  }
}

export default Items;
