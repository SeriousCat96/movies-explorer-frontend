import React from 'react';
import Navigation from '../Navigation/Navigation.jsx';
import Link from '../Link/Link.jsx';
import cx from 'classnames';
import './Footer.css';

const Footer = () => {
  return (
    <footer className={cx('footer', 'app__section')}>
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__content">
        <Navigation itemsClassName="footer__links">
          <Link to="https://praktikum.yandex.ru" className="footer__link">Яндекс.Практикум</Link>
          <Link to="https://github.com/SeriousCat96" className="footer__link">Github</Link>
          <Link to="https://vk.com/serious_cat" className="footer__link">ВКонтакте</Link>
        </Navigation>
        <p className="footer__copyright">&copy;{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
