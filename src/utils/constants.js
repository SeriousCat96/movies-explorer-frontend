export const baseUri = `${window.location.protocol}//${process.env.NODE_ENV  === 'production'
  ? process.env.REACT_APP_API_URL
  : `${window.location.hostname}:${process.env.REACT_APP_API_PORT || 3001}`}`;

export const moviesApiUri = 'https://api.nomoreparties.co';

export const headers = {
  'Content-Type': 'application/json; charset=utf-8'
};

export const nameRegex = /[A-Za-zа-яА-ЯёЁ\s-]+/;

export const loadErrorMessage = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';