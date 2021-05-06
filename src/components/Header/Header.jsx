import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Link from '../Link/Link.jsx';
import Button from '../Button/Button.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import MenuToggle from '../MenuToggle/MenuToggle.jsx';
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
  return (
    <header className={cx('header', { 'header_theme_blue': useRouteMatch({ path: '/', exact: true }) }, 'app__section')}>
      <Link to="/" className="header__link"><img className="header__logo" src={logo} alt="Лого"/></Link>
      <Switch>
        <Route exact path="/">
          <Navigation className="header__nav" itemsClassName="header__nav-items">
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
            <Link to="/signin" className="header__link">
              <Button className="header__button">
                Войти
              </Button>
            </Link>
          </Navigation>
        </Route>
        <Route exact path="/(movies|saved-movies|profile)">
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
        </Route>
      </Switch>
    </header>
  );
}

export default React.memo(Header);
