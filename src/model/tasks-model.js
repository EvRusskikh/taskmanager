import AbstractObservable from './abstract-observable';
import {UpdateType} from '../consts';

export default class TasksModel extends AbstractObservable {
  #apiService = null;
  #tasks = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get tasks() {
    return [...this.#tasks];
  }

  init = async () => {
    try {
      this.#tasks = await this.#apiService.tasks;
    } catch (err) {
      this.#tasks = [];
    }

    this._notify(UpdateType.INIT);
  }
}
