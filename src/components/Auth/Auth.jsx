import Form from '../Form/Form';
import Link from '../Link/Link';
import cx from 'classnames';
import logo from '../../images/logo.svg';
import './Auth.css';
import { Redirect, Route, Switch } from 'react-router';

const Auth = ({ inputs, onSubmit }) => {
  return (
    <section className={cx('auth', 'app__section')}>
      <Link to="/" className="auth__link"><img className="auth__logo" src={logo} alt="Лого"/></Link>
      <Switch>
        <Route exact path="/signup">
          <h1 className="auth__title">Добро пожаловать!</h1>
          <Form
            name="register"
            className="auth__form"
            submitClassName="auth__submit"
            submitTitle="Зарегистрироваться"
            inputs={inputs}
            onSubmit={onSubmit}
            useValidation
          />
          <p className="auth__text">
            Уже зарегистрированы? <Link to="/signin" className="auth__link">Войти</Link>
          </p>
        </Route>
        <Route exact path="/signin">
          <h1 className="auth__title">Рады видеть!</h1>
          <Form
            name="login"
            className="auth__form"
            submitClassName="auth__submit"
            submitTitle="Войти"
            inputs={inputs}
            onSubmit={onSubmit}
            useValidation
          />
          <p className="auth__text">
            Ещё не зарегистрированы? <Link to="/signup" className="auth__link">Регистрация</Link>
          </p>
        </Route>
        <Route path="/signup">
          <Redirect to="/signup" />
        </Route>
        <Redirect to="/signin" />
      </Switch>
    </section>
  );
}

export default Auth;
