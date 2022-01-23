import AbstractView from './abstract-view';

const createItemTemplate = ({type, count}, isActive) => (
  `<input
    type="radio"
    id="filter__${type}"
    class="filter__input visually-hidden"
    name="filter"
    data-filter="${type}"
    ${isActive ? 'checked' : ''}
    ${count === 0 ? 'disabled': ''}
  />
  <label for="filter__${type}" class="filter__label">
    ${type} <span class="filter__${type}-count">${count}</span>
  </label>`
);

const createFilterTemplate = (filters, activeFilter) => {
  const items = filters.map((item) => createItemTemplate(item, item.type === activeFilter)).join('\n');

  return `<section class="main__filter filter container">
    ${items}
  </section>`;
};

export default class FilterView extends AbstractView {
  #filters = [];
  #activeFilter = null;

  constructor(filters, activeFilter) {
    super();
    this.#filters = filters;
    this.#activeFilter = activeFilter;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#activeFilter);
  }

  setItemClickHandler = (callback) => {
    this._callback.itemClick = callback;
    this.element.querySelectorAll('[data-filter]').forEach((item) => {
      item.addEventListener('click', this.#itemClickHandler);
    });
  }

  #itemClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.itemClick(evt.target.closest('[data-filter]').dataset.filter);
  }
}
