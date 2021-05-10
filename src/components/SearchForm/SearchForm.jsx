import React from 'react';
import Form from '../Form/Form.jsx';
import Toggle from '../Toggle/Toggle.jsx';
import cx from 'classnames';
import './SearchForm.css';

function SearchForm() {
  const inputs = [
    {
      id: 'movie',
      name: 'movie',
      type: 'text',
      placeholder: 'Фильм',
      required: true,
      className: 'search__input',
      labelClassName: 'search__label',
    },
    {
      id: 'featurette',
      name: 'featurette',
      type: 'checkbox',
      required: false,
      className: 'search__input',
      labelClassName: 'search__toggle',
      children: 'Короткометражки',
      component: Toggle
    },
  ];

  return (
    <section className={cx('search', 'app__section')}>
      <Form
        name="search"
        className="search__form"
        submitClassName="search__submit"
        fieldsetClassName="search__fieldset"
        inputs={inputs}
        useValidation
      />
    </section>
  );
}

export default SearchForm;
