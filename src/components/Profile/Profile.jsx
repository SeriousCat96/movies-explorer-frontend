import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Form from '../Form/Form.jsx';
import Button from '../Button/Button.jsx';
import cx from 'classnames';
import './Profile.css';

function Profile() {
  const inputs = [
    {
      id: 'name',
      name: 'name',
      type: 'name',
      required: true,
      className: 'profile__input',
      labelClassName: 'profile__label',
      labelText: 'Имя',
      value: 'Павел',
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      required: true,
      className: 'profile__input',
      labelClassName: 'profile__label',
      labelText: 'E-mail',
      value: 'pochta@yandex.ru',
    },
  ];

  return (
    <>
      <Header />
      <Main>
        <div className={cx('profile', 'app__section')}>
          <h1 className="profile__title">Привет, Павел!</h1>
          <Form
            name="profile"
            className="profile__form"
            submitClassName="profile__submit"
            fieldsetClassName="profile__fieldset"
            submitTitle="Редактировать"
            inputs={inputs}
            useValidation
          />
          <Button className="profile__button">
            Выйти из аккаунта
          </Button>
        </div>
      </Main>
    </>

  );
}

export default Profile;
