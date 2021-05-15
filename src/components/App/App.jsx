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

  const shortFilmFilter = useFilter('shortFilm', (item, value) => !value || item.duration <= 40);
  const queryFilter = useFilter('queryString', (item, value) => (
    item.name
      .trim()
      .toLowerCase()
      .includes(value.trim().toLowerCase())
  ));

  const [movies, searchMovies] = useSearch(
    getMovies,
    queryFilter, shortFilmFilter);
  const [savedMovies, searchSavedMovies] = useSearch(
    getSavedMovies,
    queryFilter, shortFilmFilter);

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
      const [, queryString] = queryFilter;
      handleMoviesSearch({ shortFilm, queryString });
    }
  }

  function handleMovieAdd(movie) {
    if(movie.saved) {
      mainApi
      .deleteMovie(movie.saved._id)
      .then(() => {
        const [, queryString] = queryFilter;
        const [, shortFilm] = shortFilmFilter;
        searchSavedMovies({ queryString, shortFilm });
      })
      .catch(() => 'Failed to delete movie');
    } else {
      mainApi
        .addMovie(movie)
        .then(() => {
          const [, queryString] = queryFilter;
          const [, shortFilm] = shortFilmFilter;
          searchSavedMovies({ queryString, shortFilm });
        })
        .catch(() => 'Failed to add movie');
    }
  }

  function handleMovieRemove(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        const [, queryString] = queryFilter;
        const [, shortFilm] = shortFilmFilter;
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
      const [, queryString] = queryFilter;
      handleSavedMoviesSearch({ shortFilm, queryString });
    }
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
                .map((movie) => {
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
                    image: (movie.image && `${moviesApiUri}${movie.image.url}`) || '',
                    trailer: movie.trailerLink,
                    thumbnail: (movie.image && `${moviesApiUri}${movie.image.formats.thumbnail.url}`) || '',
                    alt: (movie.image && movie.image.name + movie.image.ext) || `Изображение фильма ${movie.nameRU}`,
                  };
                })
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
                onAddMovie={handleMovieAdd}
                movies={movies}
                savedMovies={savedMovies}
              />
            </AuthRoute>
            <AuthRoute exact path="/saved-movies">
              <SavedMovies
                isLoading={isLoading}
                onSearch={handleSavedMoviesSearch}
                onFilter={handleSavedMoviesFilter}
                onRemoveMovie={handleMovieRemove}
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
