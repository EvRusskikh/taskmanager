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
      const tasks = await this.#apiService.tasks;
      this.#tasks = tasks.map(this.#adaptToClient);
    } catch (err) {
      this.#tasks = [];
    }

    this._notify(UpdateType.INIT);
  }

  #adaptToClient = (task) => {
    const adaptedTask = {
      ...task,
      dueDate: task['due_date'] !== null ? new Date(task['due_date']) : task['due_date'],
      isArchived: task['is_archived'],
      isFavorite: task['is_favorite'],
      repeatingDays: ['repeating_days'],
    };

    delete adaptedTask['due_date'];
    delete adaptedTask['is_archived'];
    delete adaptedTask['is_favorite'];
    delete adaptedTask['repeating_days'];

    return adaptedTask;
  }
}
