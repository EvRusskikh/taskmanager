import {API_AUTHORIZATION, API_URL, MenuItem} from './consts';
import {remove, render} from './utils/render';
import ApiService from './api-service';
import TasksModel from './model/tasks-model';
import FilterModel from './model/filter-model';
import SiteMenuView from './view/site-menu-view';
import StatisticView from './view/statistic-view';
import BoardPresenter from './presenter/board-presenter';
import FilterPresenter from './presenter/filter-presenter';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');

const apiService = new ApiService(API_URL, API_AUTHORIZATION);
const tasksModel = new TasksModel(apiService);
const filterModel = new FilterModel();

const siteMenuComponent = new SiteMenuView();
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);
const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TASKS.type:
      filterPresenter.init();
      boardPresenter.init();
      remove(statisticsComponent);
      break;

    case MenuItem.STATISTICS.type:
      filterPresenter.destroy();
      boardPresenter.destroy();
      statisticsComponent = new StatisticView();
      render(siteMainElement, statisticsComponent);
      break;
  }
};

filterPresenter.init();
boardPresenter.init();

tasksModel.init().finally(() => {
  render(siteHeaderElement, siteMenuComponent);
  siteMenuComponent.setActiveMenu(MenuItem.TASKS.type);
  siteMenuComponent.setItemClickHandler(handleSiteMenuClick);
});

