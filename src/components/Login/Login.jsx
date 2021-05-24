import Auth from '../Auth/Auth.jsx';
import PropTypes from 'prop-types';

const Login = ({ onSubmit }) => {
  const inputs = [
    {
      id: 'email',
      name: 'email',
      type: 'email',
      required: true,
      className: 'auth__input',
      labelClassName: 'auth__label',
      labelText: 'E-mail',
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      required: true,
      minLength: 6,
      className: 'auth__input',
      labelClassName: 'auth__label',
      labelText: 'Пароль',
    },
  ];

  return (
    <Auth inputs={inputs} onSubmit={onSubmit}/>
  );
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Login;
