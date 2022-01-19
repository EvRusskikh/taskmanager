import {UpdateType} from '../consts';
import {remove, render} from '../utils/render';
import BoardView from '../view/board-view';
import NoTaskView from '../view/no-task-view';
import SortView from '../view/sort-view';
import TasksView from '../view/tasks-view';
import MoreButtonView from '../view/more-button-view';
import LoadingView from '../view/loading-view';
import TaskPresenter from './task-presenter';

const CARDS_STEP_SIZE = 8;

export default class BoardPresenter {
  #boardContainer = null;
  #taskModel = null;

  #boardComponent = new BoardView();
  #tasksListComponent = new TasksView();
  #sortComponent = new SortView();
  #loadingComponent = new LoadingView();
  #noTasksComponent = null;
  #moreButtonComponent = null;

  #renderedTasksCount = CARDS_STEP_SIZE;
  #renderedTasks = new Map();
  #isLoading = true;

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

  #handleMoreButtonClick = () => {
    const taskCount = this.tasks.length;
    const newRenderedTaskCount = Math.min(taskCount, this.#renderedTasksCount + CARDS_STEP_SIZE);
    const tasks = this.tasks.slice(this.#renderedTasksCount, newRenderedTaskCount);

    this.#renderTasks(tasks);
    this.#renderedTasksCount = newRenderedTaskCount;

    if (this.#renderedTasksCount >= taskCount) {
      remove(this.#moreButtonComponent);
    }
  }

  #renderMoreButton = () => {
    this.#moreButtonComponent = new MoreButtonView();
    this.#moreButtonComponent.setClickHandler(this.#handleMoreButtonClick);
    render(this.#boardComponent, this.#moreButtonComponent);
  }

  #renderTask = (task) => {
    const taskPresenter = new TaskPresenter(this.#tasksListComponent);
    taskPresenter.init(task);
    this.#renderedTasks.set(task.id, taskPresenter);
  }

  #renderTasks = (tasks) => {
    tasks.forEach((task) => this.#renderTask(task));
  }

  #renderBoard = () => {
    const tasksCount = this.tasks.length;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (tasksCount === 0) {
      this.#renderNoTasks();
      return;
    }

    this.#renderSort();
    render(this.#boardComponent, this.#tasksListComponent);
    this.#renderTasks(this.tasks.slice(0, Math.min(tasksCount, this.#renderedTasksCount)));

    if (tasksCount > this.#renderedTasksCount) {
      this.#renderMoreButton();
    }
  }
}

