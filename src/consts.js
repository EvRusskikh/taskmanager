export const API_URL = 'https://16.ecmascript.pages.academy/task-manager';
export const API_AUTHORIZATION = 'Basic dfheh56ertg';

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

export const FilterType = {
  ALL: 'all',
  OVERDUE: 'overdue',
  TODAY: 'today',
  FAVORITES: 'favorites',
  REPEATING: 'repeating',
  ARCHIVE: 'archive'
};

export const MenuItem = {
  ADD_NEW_TASK: {type: 'new-task', name: '+ ADD NEW TASK'},
  TASKS: {type: 'tasks', name: 'TASKS'},
  STATISTICS: {type: 'statistics', name: 'STATISTICS'}
};
