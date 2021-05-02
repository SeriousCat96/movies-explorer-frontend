import { Switch, Route } from 'react-router-dom';
import Link from '../Link/Link';
import Button from '../Button/Button';
import Navigation from '../Navigation/Navigation';
import MenuToggle from '../MenuToggle/MenuToggle';
import logo from '../../images/logo.svg';
import './Header.css';

function Header({ className = "header" }) {
  return (
    <header className={className}>
      <img className="header__logo" src={logo} alt="Лого"/>
      <Switch>
        <Route exact path="/">
          <Navigation className="header__nav">
            <Link to="/signup" className="header__nav-item" activeStyled>
              Регистрация
            </Link>
            <Link to="/signin" className="header__nav-item" activeStyled>
              <Button className="header__button">
                Войти
              </Button>
            </Link>
          </Navigation>
        </Route>
        <Route exact path="/movies">
          <MenuToggle />
          <Navigation className="header__nav">
            <Link to="/signup" className="header__nav-item" activeStyled>
              Регистрация
            </Link>
            <Link to="/signin" className="header__nav-item" activeStyled>
              <Button className="header__button">
                Войти
              </Button>
            </Link>
          </Navigation>
          <div className="header__overlay" />
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
