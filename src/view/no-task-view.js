import AbstractView from './abstract-view';
import {FilterType} from '../consts';

const NoTasksTextType = {
  [FilterType.ALL]: 'Click «ADD NEW TASK» in menu to create your first task',
  [FilterType.OVERDUE]: 'There are no overdue tasks now',
  [FilterType.TODAY]: 'There are no tasks today',
  [FilterType.FAVORITES]: 'There are no favorite tasks now',
  [FilterType.REPEATING]: 'There are no repeating tasks now',
  [FilterType.ARCHIVE]: 'There are no archive tasks now',
};

const createNoTaskTemplate = (activeFilter) => (
  `<p class="board__no-tasks">${NoTasksTextType[activeFilter]}</p>`
);

export default class NoTaskView extends AbstractView {
  #activeFilter = null;

  constructor(activeFilter) {
    super();
    this.#activeFilter = activeFilter;
  }

  get template() {
    return createNoTaskTemplate(this.#activeFilter);
  }
}
