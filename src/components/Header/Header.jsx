import { Switch, Route } from 'react-router-dom';
import Link from '../Link/Link.jsx';
import Button from '../Button/Button.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import MenuToggle from '../MenuToggle/MenuToggle.jsx';
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

const Header = ({ className = "header" }) => {
  return (
    <header className={className}>
      <img className="header__logo" src={logo} alt="Лого"/>
      <Switch>
        <Route exact path="/">
          <Navigation className="header__nav" itemsClassName="header__nav-items">
            <Link to="/signup" className="header__nav-item">
              Регистрация
            </Link>
            <Link to="/signin" className="header__nav-item">
              <Button className="header__button">
                Войти
              </Button>
            </Link>
          </Navigation>
        </Route>
        <Route exact path="/movies">
          <MenuToggle id="menu" />
          <Navigation className="header__nav" itemsClassName="header__nav-items">
            <Link exact to="/" className="header__nav-item" activeClassName="header__nav-item_active">
              Главная
            </Link>
            <Link to="/movies" className="header__nav-item" activeClassName="header__nav-item_active">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="header__nav-item" activeClassName="header__nav-item_active">
              Сохранённые фильмы
            </Link>
            <Link to="/profile" className="header__nav-item" activeClassName="header__nav-item_active">
              <Account />
            </Link>
          </Navigation>
          <div className="header__overlay" />
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
