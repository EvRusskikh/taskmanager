import AbstractView from './abstract-view';

const createItemTemplate = ({type, count}, activeFilter) => (
  `<input
    type="radio"
    id="filter__${type}"
    class="filter__input visually-hidden"
    name="filter"
    ${type === activeFilter ? 'checked' : ''}
    ${count === 0 ? 'disabled': ''}
  />
  <label for="filter__${type}" class="filter__label">
    ${type} <span class="filter__${type}-count">${count}</span></label
  >`
);

const createFilterTemplate = (filters, activeFilter) => {
  const items = filters.map((item) => createItemTemplate(item, activeFilter)).join('\n');

  return `<section class="main__filter filter container">
    ${items}
  </section>`;
};

export default class FilterView extends AbstractView {
  #filters = [];
  #activeFilter = 'all';

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#activeFilter);
  }
}
