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
