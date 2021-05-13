import React from 'react';
import Link from '../Link/Link.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import MenuToggle from '../MenuToggle/MenuToggle.jsx';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import cx from 'classnames';
import logo from '../../images/logo.svg';
import accountImg from '../../images/account.svg';
import './Header.css';

const Account = () => {
  return (
    <span>
      Аккаунт
      <img className="header__account" src={accountImg} alt="Аккаунт"/>
    </span>
  )
}

const Header = () => {
  const loggedInUser = React.useContext(CurrentUserContext);

  return (
    <header className={cx('header', 'app__section', { 'app__section_theme_dark-blue': !loggedInUser })}>
      <Link to="/" className="header__link"><img className="header__logo" src={logo} alt="Лого"/></Link>
        {
          loggedInUser ? (
            <>
              <MenuToggle id="menu" />
              <Navigation className="header__nav" itemsClassName="header__nav-items">
                <Link exact to="/" className="header__link" activeClassName="header__nav-item_active">
                  Главная
                </Link>
                <Link to="/movies" className="header__link" activeClassName="header__nav-item_active">
                  Фильмы
                </Link>
                <Link to="/saved-movies" className="header__link" activeClassName="header__nav-item_active">
                  Сохранённые фильмы
                </Link>
                <Link to="/profile" className="header__link" activeClassName="header__nav-item_active">
                  <Account />
                </Link>
              </Navigation>
              <div className="header__overlay" />
            </>
          ) : (
            <Navigation className="header__nav" itemsClassName="header__nav-items">
              <Link to="/signup" className="header__link">
                Регистрация
              </Link>
              <Link to="/signin" className={cx('header__link', 'header__link_type_button')}>
                Войти
              </Link>
            </Navigation>
          )
        }

    </header>
  );
}

export default Header;
