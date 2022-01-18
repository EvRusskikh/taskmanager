import {UpdateType} from '../consts';
import {remove, render} from '../utils/render';
import BoardView from '../view/board-view';
import NoTaskView from '../view/no-task-view';
import SortView from '../view/sort-view';
import TasksView from '../view/tasks-view';
import TaskView from '../view/task-view';
import MoreButtonView from '../view/more-button-view';
import LoadingView from '../view/loading-view';
const CARDS_STEP_SIZE = 8;

export default class BoardPresenter {
  #isLoading = true;

  #taskModel = null;

  #boardContainer = null;
  #boardComponent = new BoardView();
  #tasksListComponent = new TasksView();
  #sortComponent = new SortView();
  #moreButtonComponent = new MoreButtonView();
  #noTasksComponent = null;
  #loadingComponent = new LoadingView();

  constructor(boardContainer, taskModel) {
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;
  }

  get tasks() {
    return this.#taskModel.tasks;
  }

  init = () => {
    render(this.#boardContainer, this.#boardComponent);
    this.#renderBoard();

    this.#taskModel.addObserver(this.#handleModelEvent);
  }

  #handleModelEvent = async (updateType) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  }

  #renderLoading = () => {
    render(this.#boardComponent, this.#loadingComponent);
  }

  #renderNoTasks = () => {
    this.#noTasksComponent = new NoTaskView();
    render(this.#boardComponent, this.#noTasksComponent);
  }

  #renderSort = () => {
    render(this.#boardComponent, this.#sortComponent);
  }

  #renderTasks = () => {
    render(this.#boardComponent, this.#tasksListComponent);

    for (let i = 0; i < CARDS_STEP_SIZE; i++) {
      const task = new TaskView();
      render(this.#tasksListComponent, task);
    }

    render(this.#boardComponent, this.#moreButtonComponent);
  }

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.tasks.length === 0) {
      this.#renderNoTasks();
      return;
    }

    this.#renderSort();
    this.#renderTasks();
  }
}

