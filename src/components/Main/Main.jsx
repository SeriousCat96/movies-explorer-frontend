import { Route, Switch } from 'react-router';
import About from '../About/About.jsx';
import Movies from '../Movies/Movies.jsx';
import './Main.css'

const Main = () => {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/">
          <About />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
      </Switch>
    </main>
  );
}

export default Main;