const Method = {
  'GET': 'GET',
  'POST': 'POST',
  'PUT': 'PUT',
  'DELETE': 'DELETE',
};

export default class ApiService {
  #url = null;
  #authorization = null;

  constructor(url, authorization) {
    this.#url = url;
    this.#authorization = authorization;
  }

  get tasks() {
    return this.#load({url: 'tasks'}).then(ApiService.parseResponse);
  }

  updateTask = async (task) => {
    const response = await this.#load({
      url: `tasks/${task.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(task)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(`${this.#url}/${url}`, {method, body, headers});

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  #adaptToServer = (task) => {
    const adaptedTask = {...task,
      'due_date': task.dueDate instanceof Date ? task.dueDate.toISOString() : null,
      'is_archived': task.isArchived,
      'is_favorite': task.isFavorite,
      'repeating_days': task.repeatingDays,
    };

    // Ненужные ключи мы удаляем
    delete adaptedTask.dueDate;
    delete adaptedTask.isArchived;
    delete adaptedTask.isFavorite;
    delete adaptedTask.repeatingDays;

    return adaptedTask;
  }

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }
}
