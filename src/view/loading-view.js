import AbstractView from './abstract-view';

const createLoadingTemplate = () => (
  `<p class="board__no-tasks">
    Loading...
  </p>`
);

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}
