import React from 'react';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Form from '../Form/Form.jsx';
import Button from '../Button/Button.jsx';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { nameRegex } from '../../utils/constants';
import cx from 'classnames';
import './Profile.css';

function Profile({ onSubmit, onLogout }) {
  const { name, email } = React.useContext(CurrentUserContext);
  const [ inputs ] = React.useState([
    {
      id: 'name',
      name: 'name',
      type: 'name',
      required: true,
      pattern: nameRegex,
      className: 'profile__input',
      labelClassName: 'profile__label',
      labelText: 'Имя',
      value: name,
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      required: true,
      className: 'profile__input',
      labelClassName: 'profile__label',
      labelText: 'E-mail',
      value: email,
    },
  ]);

  return (
    <>
      <Header />
      <Main>
        <div className={cx('profile', 'app__section')}>
          <h1 className="profile__title">{`Привет, ${name}!`}</h1>
          <Form
            name="profile"
            className="profile__form"
            submitClassName="profile__submit"
            fieldsetClassName="profile__fieldset"
            submitTitle="Редактировать"
            inputs={inputs}
            onSubmit={onSubmit}
            useValidation
          />
          <Button className="profile__button" onClick={onLogout}>
            Выйти из аккаунта
          </Button>
        </div>
      </Main>
    </>

  );
}

export default Profile;
