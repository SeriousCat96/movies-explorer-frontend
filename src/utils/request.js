 import { loadErrorMessage } from './constants'

 /**
   * Отправить JSON на сервер.
   * @param {string} uri URL запроса.
   * @param {string} method Метод запроса.
   * @param {string} headers Заголовки запроса.
   * @param {string} body Тело запроса.
   * @param {string} credentials Способ отправки учётных данных.
   * @returns {Promise} Результат запроса.
   */
  export default function send(uri, method, headers, body, credentials='include') {
    return fetch(uri, { method, headers, body, credentials })
      .then(
        (response) => {
          console.debug(`${method} ${uri} status: ${response.status}`);

          if (response.ok) {
            return response.json();
          }

          return Promise.reject(loadErrorMessage);
        });
  }