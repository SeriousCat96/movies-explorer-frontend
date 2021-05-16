import React from 'react';
import Form from '../Form/Form.jsx';
import Toggle from '../Toggle/Toggle.jsx';
import cx from 'classnames';
import './SearchForm.css';

function SearchForm({ onSearch, onFilter, queryRequired }) {
  const inputs = [
    {
      id: 'queryString',
      name: 'queryString',
      type: 'text',
      placeholder: 'Фильм',
      required: queryRequired || false,
      className: 'search__input',
      labelClassName: 'search__label',
    },
    {
      id: 'shortFilm',
      name: 'shortFilm',
      type: 'checkbox',
      className: 'search__input',
      labelClassName: 'search__toggle',
      children: 'Короткометражки',
      onFilter: onFilter,
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
        onSubmit={onSearch}
        useValidation
      />
    </section>
  );
}

export default SearchForm;
