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

  updateTask = async (updateType, update) => {
    const index = this.#tasks.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#apiService.updateTask(update);
      const updatedTask = this.#adaptToClient(response);
      this.#tasks = [
        ...this.#tasks.slice(0, index),
        updatedTask,
        ...this.#tasks.slice(index + 1),
      ];
      this._notify(updateType, updatedTask);
    } catch (err) {
      throw new Error('can\'t update task');
    }
  }

  #adaptToClient = (task) => {
    const adaptedTask = {
      ...task,
      dueDate: task['due_date'] !== null ? new Date(task['due_date']) : task['due_date'],
      isArchived: task['is_archived'],
      isFavorite: task['is_favorite'],
      repeatingDays: task['repeating_days'],
    };

    delete adaptedTask['due_date'];
    delete adaptedTask['is_archived'];
    delete adaptedTask['is_favorite'];
    delete adaptedTask['repeating_days'];

    return adaptedTask;
  }
}
