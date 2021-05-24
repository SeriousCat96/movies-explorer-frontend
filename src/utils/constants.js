export const baseUri = `${window.location.protocol}//${process.env.NODE_ENV  === 'production'
  ? process.env.REACT_APP_API_URL
  : `${window.location.hostname}:${process.env.REACT_APP_API_PORT || 3001}`}`;

export const moviesApiUri = 'https://api.nomoreparties.co';

export const headers = {
  'Content-Type': 'application/json; charset=utf-8'
};

export const loadErrorMessage = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

export const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
export const nameRegex = /[A-Za-zа-яА-ЯёЁ\s-]+/;
export const MAX_DURATION_SHORT_FILM = 40;

export const RENDERED_ITEMS_COUNT_1024 = 12;
export const RENDERED_ITEMS_COUNT_768 = 8;
export const RENDERED_ITEMS_COUNT_320 = 5;
export const TO_LOAD_ITEMS_COUNT_1024 = 3;
export const TO_LOAD_ITEMS_COUNT_768 = 2;
export const TO_LOAD_ITEMS_COUNT_320 = 2;

export function validateMovie(movie) {
  return (
    movie.image &&
    urlRegex.test(`${moviesApiUri}${movie.image.url}`) &&
    urlRegex.test(`${moviesApiUri}${movie.image.formats.thumbnail.url}`) &&
    urlRegex.test(movie.trailerLink) &&
    movie.id &&
    movie.nameRU &&
    movie.nameEN &&
    movie.duration &&
    movie.director &&
    movie.country &&
    movie.year
  );
}

export function getDurationString(duration) {
  const hours = ~~(duration  / 60);
  const minutes = duration % 60;
  return hours ? `${hours}ч ${minutes}мин` : `${minutes}мин`;
}

export function createMovieDb(movie) {
  return {
    ...movie,
    name: movie.nameRU,
    durationString: getDurationString(movie.duration),
    alt: `Изображение фильма ${movie.nameRU}`,
  };
}

export function createMovieExt(movie) {
  return {
    movieId: movie.id,
    name: movie.nameRU,
    nameRU: movie.nameRU,
    nameEN: movie.nameRU,
    director: movie.director,
    country: movie.country,
    year: movie.year,
    duration: movie.duration,
    durationString: getDurationString(movie.duration),
    description: movie.description,
    image: `${moviesApiUri}${movie.image.url}`,
    trailer: movie.trailerLink,
    thumbnail: `${moviesApiUri}${movie.image.formats.thumbnail.url}`,
    alt: movie.image.name + movie.image.ext,
  };
}
