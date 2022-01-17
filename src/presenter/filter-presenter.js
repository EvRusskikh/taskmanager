import {render} from '../utils/render';
import FilterView from '../view/filter-view';

export default class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;

  constructor(container) {
    this.#filterContainer = container;
  }

  init = () => {
    this.#filterComponent = new FilterView();
    render(this.#filterContainer, this.#filterComponent);
  }
}
