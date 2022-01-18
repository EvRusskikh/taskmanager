import {FilterType} from '../consts';
import {filter} from '../utils/filter';
import {remove, render, replace} from '../utils/render';
import FilterView from '../view/filter-view';

export default class FilterPresenter {
  #tasksModel = null;

  #filterContainer = null;
  #filterComponent = null;

  constructor(filterContainer, tasksModel) {
    this.#filterContainer = filterContainer;
    this.#tasksModel = tasksModel;
  }

  get filters() {
    const filters = [];
    const tasks = this.#tasksModel.tasks;

    Object.values(FilterType).forEach((item) => {
      filters.push({type: item, count: filter[item](tasks).length});
    });

    return filters;
  }

  init = () => {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(this.filters);

    this.#tasksModel.addObserver(this.#handleModelEvent);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  }
}
