import dayjs from 'dayjs';
import {SortType} from '../consts';

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortTasks = {
  [SortType.DATE_UP]: (tasks) => (
    tasks.sort((current, next) => {
      const weight = getWeightForNullDate(current.dueDate, next.dueDate);
      return weight ?? dayjs(current.dueDate).diff(dayjs(next.dueDate));
    })
  ),
  [SortType.DATE_DOWN]: (tasks) => (
    tasks.sort((current, next) => {
      const weight = getWeightForNullDate(current.dueDate, next.dueDate);
      return weight ?? dayjs(next.dueDate).diff(dayjs(current.dueDate));
    })
  )
};
