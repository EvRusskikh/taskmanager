import {FilterType, UpdateType} from '../consts';
import {filter} from '../utils/filter';
import {remove, render, replace} from '../utils/render';
import FilterView from '../view/filter-view';

export default class FilterPresenter {
  #filterModel = null;
  #tasksModel = null;

  #filterContainer = null;
  #filterComponent = null;

  constructor(filterContainer, filterModel, tasksModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
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

    this.#filterComponent = new FilterView(this.filters, this.#filterModel.filter);
    this.#filterComponent.setItemClickHandler(this.#handleFilterChange);

    this.#tasksModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleFilterChange = (activeFilter) => {
    if (this.#filterModel.filter === activeFilter) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, activeFilter);
  }

  #handleModelEvent = () => {
    this.init();
  }
}
