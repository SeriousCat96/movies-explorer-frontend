import React from 'react';
import About from '../About/About.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
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
        <Route exact path="/">
          <About />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
