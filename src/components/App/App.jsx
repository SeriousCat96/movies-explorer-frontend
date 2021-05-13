import React from 'react';
import About from '../About/About.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Profile from '../Profile/Profile.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import AuthRoute from '../AuthRoute/AuthRoute.jsx';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Route, Switch, useHistory } from 'react-router';
import { mainApi } from '../../utils/MainApi.js';
import './App.css';

function App() {
  const [loaded, setLoaded] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState();
  const history = useHistory();

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
  };

  React.useEffect(
    () => {
      return mainApi
        .getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch(() => console.log('Failed to fetch user info'))
        .finally(() => setLoaded(true));
    },
    [setCurrentUser, setLoaded]
  );

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {
        loaded && (
          <Switch>
            <Route exact path="/" component={About} />
            <Route path="/signin" >
              <Login onSubmit={handleLogin}/>
            </Route>
            <Route path="/signup">
              <Register onSubmit={handleRegister} />
            </Route>
            <AuthRoute exact path="/movies">
              <Movies />
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
