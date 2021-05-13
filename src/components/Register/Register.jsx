import Auth from '../Auth/Auth.jsx';
import { nameRegex } from '../../utils/constants';
import PropTypes from 'prop-types';

const Register = ({ onSubmit }) => {
  const inputs = [
    {
      id: 'username',
      name: 'name',
      type: 'text',
      required: true,
      pattern: nameRegex,
      className: 'auth__input',
      labelClassName: 'auth__label',
      labelText: 'Имя',
    },
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

Register.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Register;
