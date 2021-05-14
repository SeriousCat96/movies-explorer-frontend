import { moviesApiUri, headers } from './constants.js';
import send from './request.js';

/**
 * Класс для работы с Movies API.
 */
 export default class MoviesApi {
  constructor({ baseUri, headers }) {
    this._headers = headers;
    this._baseUri = baseUri;
  }


  /**
   * Получить список всех фильмов.
   *
   * @returns {Promise} Результат запроса.
   */
  getMovies() {
    return send(`${this._baseUri}/beatfilm-movies`, 'GET', this._headers, null, 'omit');
  }
}

export const moviesApi = new MoviesApi({ baseUri: moviesApiUri, headers });
