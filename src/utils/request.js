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

          const error = new Error();
          error.status = response.status;

          switch (response.status) {
            case 401:
              error.message = 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.';
              break;
            case 403:
                error.message = 'Недостаточно прав для доступа к данному ресурсу.';
                break;
            case 404:
              error.message = 'Страница по указанному маршруту не найдена.';
              break;
            default:
              error.message = 'На сервере произошла ошибка.';
              break;
          }
          throw error;
        }
      )
      .catch(() => {
        throw new Error(loadErrorMessage);
      });
  }