import React from 'react';
import About from '../About/About.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Profile from '../Profile/Profile.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import { Route, Switch, useLocation } from 'react-router';
import './App.css';

function App() {
  const location = useLocation();

  React.useEffect(
    () => {
      const hash = location.hash;

      if (hash) {
        const anchorElement = document.querySelector(hash);
        if (anchorElement) {
          anchorElement.scrollIntoView({ behavior: "smooth" })
        }
      }
    },
    [location]
  );

  return (
    <>
      <Switch>
        <Route exact path="/" component={About} />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/saved-movies" component={SavedMovies} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
