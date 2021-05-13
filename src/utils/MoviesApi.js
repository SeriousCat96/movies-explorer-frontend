import { moviesApiUri, headers } from './constants.js';
import sendJson from './request.js';

/**
 * Класс для работы с Movies API.
 */
 export default class MoviesApi {
  constructor({ baseUri, headers }) {
    this._baseUri = baseUri;
    this._headers = headers;
  }


  /**
   * Получить список всех фильмов.
   *
   * @returns {Promise} Результат запроса.
   */
  getMovies() {
    return sendJson(this._baseUri, 'GET', this._headers);
  }
}

export const api = new MoviesApi({ moviesApiUri, headers });