import React from 'react';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutSection from '../AboutSection/AboutSection';
import AboutProject from '../AboutProject/AboutProject';
import AboutMe from '../AboutMe/AboutMe';
import Techs from '../Techs/Techs';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import { Route, Switch, useLocation } from 'react-router';
import './App.css';

function App() {
  const location = useLocation();

  React.useEffect(() => {
    const hash = location.hash;

    if (hash) {
      const anchorElement = document.querySelector(hash);
      if (anchorElement) {
        anchorElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [location]);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Header className="header header_theme_blue app__section" />
          <Promo />
          <AboutSection title="О проекте" id="about">
            <AboutProject />
          </AboutSection>
          <AboutSection title="Технологии" id="techs">
            <Techs />
          </AboutSection>
          <AboutSection title="Студент" id="student">
            <AboutMe />
          </AboutSection>
          <Portfolio />
          <Footer />
        </Route>
        <Route exact path="/movies">
          <Header className="header app__section" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
