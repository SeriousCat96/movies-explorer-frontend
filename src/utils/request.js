 /**
   * Отправить JSON на сервер.
   * @param {string} uri URL запроса.
   * @param {string} method Метод запроса.
   * @param {string} headers Заголовки запроса.
   * @param {string} body Тело запроса.
   * @returns {Promise} Результат запроса.
   */
  export default function sendJson(uri, method, headers, body) {
    return fetch(uri, { method, headers, body, credentials: 'include' })
      .then(
        (response) => {
          console.debug(`${method} ${uri} status: ${response.status}`);

          if (response.ok) {
            return response.json();
          }

          return Promise.reject('Ошибка запроса');
        });
  }