import {ControlType, UpdateType, UserAction} from '../consts';
import {remove, render, replace} from '../utils/render';
import TaskView from '../view/task-view';

export const StateType = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export default class TaskPresenter {
  #tasksListContainer = null;
  #changeData = null;

  #taskComponent = null;

  #task = null;

  constructor(tasksListContainer, changeData) {
    this.#tasksListContainer = tasksListContainer;
    this.#changeData = changeData;
  }

  init = (task) => {
    this.#task = task;

    const prevTaskComponent = this.#taskComponent;

    this.#taskComponent = new TaskView(task);
    this.#taskComponent.setControlClickHandler(this.#handleControlClick);

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

  #handleControlClick = (controlType) => {
    switch (controlType) {
      case ControlType.ARCHIVE:
        this.#changeData(
          UserAction.UPDATE_TASK,
          UpdateType.MINOR,
          {...this.#task, isArchived: !this.#task.isArchived},
        );
        break;

      case ControlType.FAVORITES:
        this.#changeData(
          UserAction.UPDATE_TASK,
          UpdateType.MINOR,
          {...this.#task, isFavorite: !this.#task.isFavorite},
        );
        break;
    }
  }

  setViewState = (state) => {
    switch (state) {
      case StateType.SAVING:
        break;

      case StateType.DELETING:
        break;

      case StateType.ABORTING:
        this.#taskComponent.shake();
        break;
    }
  }
}
