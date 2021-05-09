import Auth from '../Auth/Auth.jsx';

function Login() {
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

export default Login;
