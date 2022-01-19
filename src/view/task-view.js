import AbstractView from './abstract-view';
import {formatDate, isTaskExpired, isTaskRepeating} from '../utils/task';

const createDateTemplate = (date) => (
  `<div class="card__dates">
    <div class="card__date-deadline">
      <p class="card__input-deadline-wrap">
        <span class="card__date">${formatDate(date)}</span>
      </p>
    </div>
  </div>`
);

const createTaskTemplate = ({color, repeatingDays, description, dueDate, isArchived, isFavorite}) => {
  const repeatingClassName = isTaskRepeating(repeatingDays) ? 'card--repeat' : '';
  const deadlineClassName = isTaskExpired(dueDate) ? 'card--deadline' : '';
  const isDisabled = (condition) => condition ? 'card__btn--disabled' : '';

  return `<article class="card card--${color} ${repeatingClassName} ${deadlineClassName}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive ${isDisabled(isArchived)}">
            archive
          </button>
          <button type="button" class="card__btn card__btn--favorites ${isDisabled(isFavorite)}">
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">${description}</p>
        </div>

        <div class="card__settings">
          <div class="card__details">
            ${dueDate ? createDateTemplate(dueDate) : ''}
          </div>
        </div>
      </div>
    </div>
  </article>`;
};

export default class TaskView extends AbstractView {
  #task = {};

  constructor(task) {
    super();
    this.#task = task;
  }

  get template() {
    return createTaskTemplate(this.#task);
  }
}
