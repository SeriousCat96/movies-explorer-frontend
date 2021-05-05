import React from 'react';
import { useLocation, useRouteMatch } from 'react-router';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import cx from 'classnames';
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
    <div className="app">
      <Header className={cx('header',  { 'header_theme_blue' : useRouteMatch({ path: '/', exact: true })}, 'app__section')} />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
