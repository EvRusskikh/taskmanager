import AbstractObservable from './abstract-observable';
import {FilterType} from '../consts';

export default class FilterModel extends AbstractObservable {
  #filter = FilterType.ALL;

  get filter() {
    return this.#filter;
  }

  setFilter = (type, filter) => {
    this.#filter = filter;
    this._notify(type, filter);
  }
}
