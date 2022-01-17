import {render} from '../utils/render';
import BoardView from '../view/board-view';
import NoTaskView from '../view/no-task-view';
import SortView from '../view/sort-view';
import TasksView from '../view/tasks-view';
import TaskView from '../view/task-view';
import MoreButtonView from '../view/more-button-view';

const CARDS_STEP_SIZE = 8;

export default class BoardPresenter {
  #tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  #boardContainer = null;
  #boardComponent = new BoardView();
  #tasksListComponent = new TasksView();
  #sortComponent = new SortView();
  #moreButtonComponent = new MoreButtonView();
  #noTasksComponent = null;

  constructor(container) {
    this.#boardContainer = container;
  }

  init = () => {
    render(this.#boardContainer, this.#boardComponent);
    this.#renderBoard();
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
    if (this.#tasks.length === 0) {
      this.#renderNoTasks();
      return;
    }

    this.#renderSort();
    this.#renderTasks();
  }
}

