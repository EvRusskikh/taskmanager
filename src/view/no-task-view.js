import AbstractView from './abstract-view';

const createNoTaskTemplate = (text) => (
  `<p class="board__no-tasks">${text}</p>`
);

export default class NoTaskView extends AbstractView {
  #text = 'Click «ADD NEW TASK» in menu to create your first task';

  get template() {
    return createNoTaskTemplate(this.#text);
  }
}
