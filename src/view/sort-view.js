import AbstractView from './abstract-view';
import {SortType} from '../consts';

const createItemTemplate = (item, isActive) => (
  `<a href="#" class="board__sort-item ${isActive ? 'board__sort-item--active' : ''}" data-sort="${item}">
    SORT BY ${item}
  </a>`
);

const createSortTemplate = (activeSort) => {
  const sortList = Object.values(SortType)
    .map((item) => createItemTemplate(item, item === activeSort)).join('\n');

  return `<div class="board__sort-list">${sortList}</div>`;
};

export default class SortView extends AbstractView {
  #activeSort = null;

  constructor(activeSort) {
    super();
    this.#activeSort = activeSort;
  }

  get template() {
    return createSortTemplate(this.#activeSort);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.querySelectorAll('.board__sort-item').forEach((item) => {
      item.addEventListener('click', this.#sortTypeChangeHandler);
    });
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sort);
  }
}
