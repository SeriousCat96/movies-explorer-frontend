import React from 'react';
import { Route, Switch, useHistory } from 'react-router';
import About from '../About/About.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Profile from '../Profile/Profile.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import AuthRoute from '../AuthRoute/AuthRoute.jsx';
import useFilter from '../../hooks/useFilter';
import useSearch from '../../hooks/useSearch';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';
import { moviesApiUri } from '../../utils/constants';
import { regex as urlRegex } from '../../utils/url';
import { moviesApi } from '../../utils/MoviesApi';
import './App.css';

function App() {
  const [tokenChecked, setTokenChecked] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();

  const getSavedMovies = React.useCallback(
    () => {
      return mainApi
        .getMovies()
        .then((moviesData) => (
          Promise.resolve(
            moviesData
              .map((movie) => {
                return {
                  ...movie,
                  name: movie.nameRU,
                  durationString: getDurationString(movie.duration),
                  alt: `Изображение фильма ${movie.nameRU}`,
                };
              })
        )))
        .catch(() => 'Failed to get saved movies.');
    },
    []
  );

  const moviesShortFilmFilter = useFilter('shortFilm', (item, value) => !value || item.duration <= 40);
  const savesMoviesShortFilmFilter = useFilter('shortFilm', (item, value) => !value || item.duration <= 40);
  const moviesQueryFilter = useFilter('queryString', (item, value) => (
    item.name
      .trim()
      .toLowerCase()
      .includes(value.trim().toLowerCase())
  ));
  const savedMoviesQueryFilter = useFilter('queryString', (item, value) => (
    item.name
      .trim()
      .toLowerCase()
      .includes(value.trim().toLowerCase())
  ));

  const [movies, searchMovies] = useSearch(
    getMovies,
    moviesQueryFilter, moviesShortFilmFilter);
  const [savedMovies, searchSavedMovies] = useSearch(
    getSavedMovies,
    savedMoviesQueryFilter, savesMoviesShortFilmFilter);

  function handleLogin(userData) {
    mainApi
      .signIn(userData)
      .then(() => mainApi
        .getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        }))
      .then(() => history.push('/movies'))
      .catch(() => console.log('Failed to login'));
  }

  function handleLogout() {
    mainApi
      .signOut()
      .then(() => {
        setCurrentUser(null);
        localStorage.removeItem('movies');
        history.push('/');
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(userData) {
    mainApi
      .signUp(userData)
      .then(() => {
        const { email, password } = userData;
        handleLogin({ email, password });
      })
      .catch(err => console.log(err));
  }

  function handleEditProfile(userInfo) {
    mainApi
      .setUserInfo(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
      })
      .catch(() => console.error("Failed to edit profile."))
  }

  function handleMoviesSearch(query) {
    setIsLoading(true);

    searchMovies(query)
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleMoviesFilter(shortFilm) {
    if (movies && movies.length) {
      const [, queryString] = moviesQueryFilter;
      handleMoviesSearch({ shortFilm, queryString });
    }
  }

  function handleMovieAction(movie) {
    if(movie.saved) {
      mainApi
      .deleteMovie(movie.saved._id)
      .then(() => searchSavedMovies())
      .catch(() => 'Failed to delete movie');
    } else {
      mainApi
        .addMovie(movie)
        .then(() => searchSavedMovies())
        .catch(() => 'Failed to add movie');
    }
  }

  function handleSavedMovieAction(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        const [, queryString] = savedMoviesQueryFilter;
        const [, shortFilm] = savesMoviesShortFilmFilter;
        searchSavedMovies({ queryString, shortFilm });
      })
      .catch(() => 'Failed to delete movie');
  }

  function handleSavedMoviesSearch(query) {
    setIsLoading(true);

    searchSavedMovies(query)
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleSavedMoviesFilter(shortFilm) {
    if (savedMovies && savedMovies.length) {
      const [, queryString] = savedMoviesQueryFilter;
      handleSavedMoviesSearch({ shortFilm, queryString });
    }
  }
  function validateMovie(movie) {
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

  function getMovies() {
    const storageMovies = localStorage.getItem('movies');
    return Promise.resolve(
      storageMovies ? (
        Promise.resolve(storageMovies)
      ) : (
        moviesApi
          .getMovies()
          .then((moviesData) => (
            Promise.resolve(
              moviesData
                .reduce((movies, movie) => (
                  validateMovie(movie) ? ([
                    ...movies,
                    {
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
                    }
                  ] ) : (
                    movies
                  )
                ), [])
          ))
        )
      )
    )
      .then((moviesData) => {
        if (!storageMovies) {
          localStorage.setItem('movies', JSON.stringify(moviesData));
        } else {
          moviesData = JSON.parse(storageMovies);
        }

        return Promise.resolve(moviesData);
      });
  }

  function getDurationString(duration) {
    const hours = ~~(duration  / 60);
    const minutes = duration % 60;
    return hours ? `${hours}ч ${minutes}мин` : `${minutes}мин`;
  }

  const getCurrentUser = React.useCallback(
    () => {
      return mainApi
        .getUserInfo()
        .then(({name, email}) => {
          setCurrentUser({name, email});
        })
        .catch(() => console.log('Failed to fetch user info'))
        .finally(() => setTokenChecked(true));
    },
    []
  );

  React.useEffect(
    () => {
      getCurrentUser()
        .then(() => searchSavedMovies())
        .catch((err) => console.log(err));
    },
    [getCurrentUser, searchSavedMovies]
  );

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {
        tokenChecked && (
          <Switch>
            <Route exact path="/" component={About} />
            <Route path="/signin" >
              <Login onSubmit={handleLogin}/>
            </Route>
            <Route path="/signup">
              <Register onSubmit={handleRegister} />
            </Route>
            <AuthRoute exact path="/movies">
              <Movies
                isLoading={isLoading}
                onSearch={handleMoviesSearch}
                onFilter={handleMoviesFilter}
                onAction={handleMovieAction}
                movies={movies}
                savedMovies={savedMovies}
              />
            </AuthRoute>
            <AuthRoute exact path="/saved-movies">
              <SavedMovies
                isLoading={isLoading}
                onSearch={handleSavedMoviesSearch}
                onFilter={handleSavedMoviesFilter}
                onAction={handleSavedMovieAction}
                movies={savedMovies}
              />
            </AuthRoute>
            <AuthRoute exact path="/profile">
              <Profile onLogout={handleLogout} onSubmit={handleEditProfile} />
            </AuthRoute>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        )
      }
    </CurrentUserContext.Provider>
  );
}

export default App;
