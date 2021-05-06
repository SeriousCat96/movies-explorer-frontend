import React from 'react';
import Button from '../Button/Button';
import { useHistory } from 'react-router';
import './NotFound.css';

const NotFound = () => {
  const history = useHistory();

  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <Button className="not-found__button" onClick={() => history.goBack()}>
        Назад
      </Button>
    </section>
 )
}

export default NotFound;