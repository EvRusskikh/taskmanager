import {FilterType, SortType, UpdateType} from '../consts';
import {remove, render} from '../utils/render';
import {filter} from '../utils/filter';
import {sortTasks} from '../utils/sort';
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
  #filterModel = null;

  #boardComponent = new BoardView();
  #tasksListComponent = new TasksView();
  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #noTasksComponent = null;
  #moreButtonComponent = null;

  #renderedTasksCount = CARDS_STEP_SIZE;
  #renderedTasks = new Map();
  #activeFilter = FilterType.ALL;
  #activeSort = SortType.DEFAULT;
  #isLoading = true;

  constructor(boardContainer, taskModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;
    this.#filterModel = filterModel;
  }

  get tasks() {
    this.#activeFilter = this.#filterModel.filter;
    const tasks = this.#taskModel.tasks;
    const filteredTasks = filter[this.#activeFilter](tasks);

    switch (this.#activeSort) {
      case SortType.DATE_UP:
        return sortTasks[SortType.DATE_UP](filteredTasks);

      case SortType.DATE_DOWN:
        return sortTasks[SortType.DATE_DOWN](filteredTasks);
    }

    return filteredTasks;
  }

  init = () => {
    render(this.#boardContainer, this.#boardComponent);
    this.#renderBoard();

    this.#taskModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  destroy = () => {
    this.#clearBoard();

    remove(this.#boardComponent);

    this.#taskModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  #handleModelEvent = async (updateType) => {
    switch (updateType) {
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
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
    this.#noTasksComponent = new NoTaskView(this.#filterModel.filter);
    render(this.#boardComponent, this.#noTasksComponent);
  }

  #handleSortTypeChange = (activeSort) => {
    if (this.#activeSort === activeSort) {
      return;
    }

    this.#activeSort = activeSort;

    this.#clearBoard();
    this.#renderBoard();
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#activeSort);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

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

  #clearBoard = () => {
    this.#renderedTasks.forEach((presenter) => presenter.destroy());
    this.#renderedTasks.clear();

    this.#renderedTasksCount = CARDS_STEP_SIZE;

    remove(this.#loadingComponent);

    remove(this.#sortComponent);
    remove(this.#tasksListComponent);
    remove(this.#moreButtonComponent);

    if (this.#noTasksComponent) {
      remove(this.#noTasksComponent);
    }
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

