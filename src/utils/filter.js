import {FilterType} from '../consts';
import {isTaskExpired, isTaskExpiringToday, isTaskRepeating} from './task';

export const filter = {
  [FilterType.ALL]: (tasks) => tasks.filter((item) => !item.isArchived),
  [FilterType.OVERDUE]: (tasks) => tasks.filter((item) => isTaskExpired(item.dueDate) && !item.isArchived),
  [FilterType.TODAY]: (tasks) => tasks.filter((item) => isTaskExpiringToday(item.dueDate) && !item.isArchived),
  [FilterType.FAVORITES]: (tasks) => tasks.filter((item) => item.isFavorite && !item.isArchived),
  [FilterType.REPEATING]: (tasks) => tasks.filter((item) => isTaskRepeating(item.repeatingDays) && !item.isArchived),
  [FilterType.ARCHIVE]: (tasks) => tasks.filter((item) => item.isArchived),
};
