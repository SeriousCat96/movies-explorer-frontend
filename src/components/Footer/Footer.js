import React from 'react';
import Navigation from '../Navigation/Navigation';
import Link from '../Link/Link';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer app__section">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__content">
        <Navigation className="footer__nav">
          <Link to="https://praktikum.yandex.ru" className="footer__link">Яндекс.Практикум</Link>
          <Link to="https://github.com/SeriousCat96" className="footer__link">Github</Link>
          <Link to="https://vk.com/serious_cat" className="footer__link">ВКонтакте</Link>
        </Navigation>
        <p className="footer__copyright">&copy;{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default Footer;
