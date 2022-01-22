import {remove, render, replace} from '../utils/render';
import TaskView from '../view/task-view';

export default class TaskPresenter {
  #tasksListContainer = null;

  #taskComponent = null;

  #task = null;

  constructor(tasksListContainer) {
    this.#tasksListContainer = tasksListContainer;
  }

  init = (task) => {
    this.#task = task;

    const prevTaskComponent = this.#taskComponent;

    this.#taskComponent = new TaskView(task);

    if (prevTaskComponent === null) {
      render(this.#tasksListContainer, this.#taskComponent);
      return;
    }

    replace(this.#taskComponent, prevTaskComponent);
    remove(prevTaskComponent);
  }

  destroy = () => {
    remove(this.#taskComponent);
  }
}
