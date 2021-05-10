import Auth from '../Auth/Auth.jsx';

function Register() {
  const inputs = [
    {
      id: 'username',
      name: 'name',
      type: 'text',
      required: true,
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
      className: 'auth__input',
      labelClassName: 'auth__label',
      labelText: 'Пароль',
    },
  ];

  return (
    <>
      <Auth inputs={inputs}/>
    </>

  );
}

export default Register;
