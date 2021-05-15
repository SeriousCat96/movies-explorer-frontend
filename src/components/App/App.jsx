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

  const featuretteFilter = useFilter('featurette', (item, disabled) => !disabled || item.duration <= 40);
  const queryFilter = useFilter('query', (item, query) => {
    const queryString = query
      .trim()
      .toLowerCase();
    return item.name
      .trim()
      .toLowerCase()
      .includes(queryString);
  });
  const [movies, searchMovies] = useSearch(
    getMoviesRepository,
    queryFilter, featuretteFilter);

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

  function handleMoviesSearch(searchQuery) {
    searchMovies(searchQuery)
      .catch((err) => console.log(err));
  }

  function getMoviesRepository() {
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
                    ...movie,
                    name: movie.nameRU,
                    durationString: getDurationString(movie.duration),
                    imageUrl: (movie.image && `${moviesApiUri}${movie.image.url}`) || '',
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

  function handleMoviesFilter(featurette) {
    if (movies.length) {
      searchMovies({ featurette });
    }
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
      getCurrentUser().catch((err) => console.log(err))
    },
    [getCurrentUser]
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
              <Movies isLoading={isLoading} onSearch={handleMoviesSearch} onFilter={handleMoviesFilter} movies={movies} />
            </AuthRoute>
            <AuthRoute exact path="/saved-movies">
              <SavedMovies />
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
