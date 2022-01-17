import {render} from './utils/render';
import SiteMenuView from './view/site-menu-view';
import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');

const siteMenuComponent = new SiteMenuView();
const filterPresenter = new FilterPresenter(siteMainElement);
const boardPresenter = new BoardPresenter(siteMainElement);

render(siteHeaderElement, siteMenuComponent);
filterPresenter.init();
boardPresenter.init();
