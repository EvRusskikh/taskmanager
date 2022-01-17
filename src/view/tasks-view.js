import AbstractView from './abstract-view';

const createTasksTemplate = () => (
  '<div class="board__tasks"></div>'
);

export default class TasksView extends AbstractView {
  get template() {
    return createTasksTemplate();
  }
}
