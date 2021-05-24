import { baseUri, headers } from './constants.js';
import send from './request.js';

/**
 * Класс для работы с API приложения.
 */
 export class MainApi {
  constructor({ baseUri, headers }) {
    this._baseUri = baseUri;
    this._headers = headers;
  }

  /**
   * Залогиниться на сервере
   *
   * @param {Object} userData учётные данные пользователя.
   * @returns {Promise} Результат запроса.
   */
  signIn(userData) {
    return send(`${this._baseUri}/signin`, 'POST', this._headers, JSON.stringify(userData))
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        return Promise.resolve(data);
      })
      .catch((err) => {
        if (err instanceof Error && err.status) {
          err.message = err.status === 401
            ? 'Вы ввели неправильный логин или пароль.'
            : 'При регистрации пользователя произошла ошибка.';

            throw err;
        }
      });
  }

  /**
   * Зарегестрировать нового пользователя
   *
   * @param {Object} userData учётные данные пользователя.
   * @returns {Promise} Результат запроса.
   */
  signUp(userData) {
    return send(`${this._baseUri}/signup`, 'POST', this._headers, JSON.stringify(userData))
      .catch((err) => {
        if (err instanceof Error && err.status) {
          err.message = err.status === 409
            ? 'Пользователь с таким email уже существует.'
            : 'При регистрации пользователя произошла ошибка.';

            throw err;
        }
      });
  }

  /**
   * Разлогиниться на сервере
   *
   * @returns {Promise}
   */
  signOut() {
    return Promise.resolve(localStorage.removeItem('jwt'));
  }

  /**
   * Добавить карточку.
   *
   * @param {Object} movie Данные фильма.
   * @returns {Promise} Результат запроса.
   */
  addMovie(movie) {
    return send(`${this._baseUri}/movies`, 'POST', this._getHeaders(), JSON.stringify(movie));
  }

  /**
   *
   * @param {string} movieId Id фильма.
   * @returns {Promise} Результат запроса.
   */
  deleteMovie(movieId) {
    return send(`${this._baseUri}/movies/${movieId}`, 'DELETE', this._getHeaders());
  }

  /**
   * Получить список всех фильмов..
   *
   * @returns {Promise} Результат запроса.
   */
  getMovies() {
    return send(`${this._baseUri}/movies`, 'GET', this._getHeaders());
  }

  /**
   * Получить токен авторизации из хранилища.
   *
   * @returns {Promise}
   */
  getToken() {
    const token = localStorage.getItem('jwt');
    return token ? Promise.resolve(localStorage.getItem('jwt')) : Promise.reject('Token not found');
  }

  /**
   * Получить информацию о текущем пользователе.
   *
   * @returns {Promise} Результат запроса.
   */
  getUserInfo() {
    return send(`${this._baseUri}/users/me`, 'GET', this._getHeaders());
  }

  /**
   * Обновить информацию о текущем пользователе.
   *
   * @returns {Promise} Результат запроса.
   */
  setUserInfo(userInfo) {
    return send(`${this._baseUri}/users/me`, 'PATCH', this._getHeaders(), JSON.stringify(userInfo))
      .catch((err) => {
        if (err instanceof Error && err.status) {
          err.message = err.status === 409
            ? 'Пользователь с таким email уже существует.'
            : 'При обновлении профиля произошла ошибка.';

            throw err;
        }
      });
  }

  _getHeaders() {
    const headers = {...this._headers};
    const token = localStorage.getItem('jwt');

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }
}

export const mainApi = new MainApi({ baseUri, headers });