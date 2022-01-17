import AbstractView from './abstract-view';

const createMoreButtonTemplate = () => (
  '<button class="load-more" type="button">load more</button>'
);

export default class MoreButtonView extends AbstractView {
  get template() {
    return createMoreButtonTemplate();
  }
}
