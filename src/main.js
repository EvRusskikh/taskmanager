import {API_AUTHORIZATION, API_URL} from './consts';
import {render} from './utils/render';
import ApiService from './api-service';
import TasksModel from './model/tasks-model';
import SiteMenuView from './view/site-menu-view';
import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');

const apiService = new ApiService(API_URL, API_AUTHORIZATION);
const tasksModel = new TasksModel(apiService);

const siteMenuComponent = new SiteMenuView();
const filterPresenter = new FilterPresenter(siteMainElement, tasksModel);
const boardPresenter = new BoardPresenter(siteMainElement, tasksModel);

filterPresenter.init();
boardPresenter.init();

tasksModel.init().finally(() => {
  render(siteHeaderElement, siteMenuComponent);
});

