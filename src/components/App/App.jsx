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
import Preloader from '../Preloader/Preloader.jsx';
import useFilter from '../../hooks/useFilter';
import useSearch from '../../hooks/useSearch';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { createMovieExt, createMovieDb, validateMovie } from '../../utils/constants';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import './App.css';
import InfoPopup from '../InfoPopup/InfoPopup.jsx';
import successImg from '../../images/success.png';
import failImg from '../../images/fail.png';

function App() {
  const MAX_DURATION_SHORT_FILM = 40;

  const [tokenChecked, setTokenChecked] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState(false);
  const [loadErrorMessage, setLoadErrorMessage] = React.useState('');
  const [isInfoPopupActive, setIsInfoPopupActive] = React.useState(false);
  const [authImg, setPopupImg] = React.useState(failImg);
  const [popupTitle, setPopupTitle] = React.useState('');
  const history = useHistory();

  const moviesMaxDurationFilter = useFilter('shortFilm', (item, value) => !value || item.duration <= MAX_DURATION_SHORT_FILM);
  const savesMoviesMaxDurationFilter = useFilter('shortFilm', (item, value) => !value || item.duration <= MAX_DURATION_SHORT_FILM);
  const moviesNameFilter = useFilter('queryString', (item, value) => (
    !value || item.name
      .trim()
      .toLowerCase()
      .includes(value.trim().toLowerCase())
  ));
  const savedMoviesNameFilter = useFilter('queryString', (item, value) => (
    !value || item.name
      .trim()
      .toLowerCase()
      .includes(value.trim().toLowerCase())
  ));

  const [moviesSearchResults, setMoviesSearchResults, searchMovies] = useSearch(
    getMovies,
    moviesNameFilter, moviesMaxDurationFilter);
  const [savedMoviesSearhResults, setSavedMoviesSearhResults, searchSavedMovies] = useSearch(
    savedMovies,
    savedMoviesNameFilter, savesMoviesMaxDurationFilter);


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

  const getSavedMovies = React.useCallback(
    () => {
      return mainApi
        .getMovies()
        .then((moviesData) => (
          Promise.resolve(moviesData.map((movie) => createMovieDb(movie))))
        )
        .catch(() => 'Failed to get saved movies.');
    },
    []
  );

  function getMovies() {
    const storageMovies = localStorage.getItem('movies');
    setLoadErrorMessage('');

    return Promise.resolve(
      storageMovies ? (
        Promise.resolve(storageMovies)
      ) : (
        moviesApi
          .getMovies()
          .then((moviesData) => (
            Promise.resolve(moviesData.reduce((movies, movie) => (
              validateMovie(movie) ? [...movies, createMovieExt(movie)] : movies
            ), []))
          )
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
      })
      .catch((err) =>  {
        setPopupImg(failImg);
        setPopupTitle(err.message);
        setIsInfoPopupActive(true);
        return Promise.reject(err);
      });
  }

  function handleLogin(userData) {
    mainApi
      .signIn(userData)
      .then(() => mainApi
        .getUserInfo()
        .then((user) => {
          setCurrentUser(user);
          setPopupImg(successImg);
          setPopupTitle('Вы успешно авторизовались!');
        }))
      .then(() => history.push('/movies'))
      .catch((err) => {
        setPopupImg(failImg);
        setPopupTitle(err.message);
      })
      .finally(() => setIsInfoPopupActive(true));
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
      .catch((err) => setPopupTitle(err.message))
      .finally(() => setIsInfoPopupActive(true));
  }

  function handleEditProfile(userInfo) {
    mainApi
      .setUserInfo(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        setPopupTitle('Профиль успешно обновлён.');
        setPopupImg(successImg);
      })
      .catch((err) => {
        setPopupImg(failImg);
        setPopupTitle(err.message);
      })
      .finally(() => setIsInfoPopupActive(true));
  }

  function handleMoviesSearch(query) {
    setIsLoading(true);

    searchMovies(query)
      .finally(() => setIsLoading(false));
  }

  function handleMoviesFilter(shortFilm) {
    if (moviesSearchResults) {
      const [, queryString] = moviesNameFilter;
      handleMoviesSearch({ shortFilm, queryString });
    }
  }

  function handleMovieAction(movie) {
    if(movie.saved) {
      mainApi
      .deleteMovie(movie.saved._id)
      .then((deletedMovie) => {
        setSavedMovies((items) => items.filter(i => i._id !== deletedMovie._id));
        setSavedMoviesSearhResults((items) => items.filter(i => i._id !== deletedMovie._id));
      })
      .catch(() => 'Failed to delete movie');
    } else {
      mainApi
        .addMovie(movie)
        .then((newMovie) => {
          setSavedMovies((items) => [...items, createMovieDb(newMovie)]);
          setSavedMoviesSearhResults((items) => [...items, createMovieDb(newMovie)]);
        })
        .catch(() => 'Failed to add movie');
    }
  }

  function handleSavedMovieAction(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then((deletedMovie) => {
        setSavedMovies((items) => items.filter(i => i._id !== deletedMovie._id));
        setSavedMoviesSearhResults((items) => items.filter(i => i._id !== deletedMovie._id));
      })
      .catch(() => 'Failed to delete movie');
  }

  function handleSavedMoviesSearch(query) {
    setIsLoading(true);
    searchSavedMovies(query)
      .finally(() => setIsLoading(false));
  }

  function handleSavedMoviesFilter(shortFilm) {
    if (savedMovies) {
      const [, queryString] = savedMoviesNameFilter;
      handleSavedMoviesSearch({ shortFilm, queryString });
    }
  }

  function handleCloseAllPopups() {
    setIsInfoPopupActive(false);
  };

  React.useEffect(
    () => {
      const handleEscKeyPressed = (evt) => {
        evt.preventDefault();

        if (evt.key === 'Escape') {
          handleCloseAllPopups();
        }
      };

      document.addEventListener('keyup', handleEscKeyPressed);

      return () => document.removeEventListener('keyup', handleEscKeyPressed);
    },
    []
  );

  React.useEffect(
    () => {
      getCurrentUser()
        .catch((err) => console.log(err));
    },
    [getCurrentUser]
  );

  React.useEffect(
    () => {
      if (!currentUser) {
        setLoadErrorMessage('');
        setMoviesSearchResults(null);
      }
    },
    [currentUser, setMoviesSearchResults]
  );

  React.useEffect(
    () => {
      if (currentUser) {
        getSavedMovies()
          .then((items) => {
            setSavedMovies(items);
            setSavedMoviesSearhResults(items);
          })
          .catch((err) => console.log(err));
      } else {
        setSavedMovies(null);
        setSavedMoviesSearhResults(null);
      }
    },
    [getSavedMovies, setSavedMoviesSearhResults, currentUser]
  );

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {
        tokenChecked ? (
          <Switch>
            <Route exact path="/" component={About} />
            <Route path="/signin" >
              <Login onSubmit={handleLogin} />
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
                movies={moviesSearchResults}
                savedMovies={savedMovies}
                errorMessage={loadErrorMessage}
              />
            </AuthRoute>
            <AuthRoute exact path="/saved-movies">
              <SavedMovies
                isLoading={isLoading}
                onSearch={handleSavedMoviesSearch}
                onFilter={handleSavedMoviesFilter}
                onAction={handleSavedMovieAction}
                movies={savedMoviesSearhResults}
                errorMessage={loadErrorMessage}
              />
            </AuthRoute>
            <AuthRoute exact path="/profile">
              <Profile onLogout={handleLogout} onSubmit={handleEditProfile} />
            </AuthRoute>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        ) : (
          <Preloader />
        )
      }
      <InfoPopup
        onClose={handleCloseAllPopups}
        isActive={isInfoPopupActive}
        image={authImg}
        title={popupTitle}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
