import React from 'react';
import PropTypes from 'prop-types';
import './MenuToggle.css';

function MenuToggle({ id }) {
  return (
    <>
      <input id={id} className="menu-toggle" type="checkbox" />
      <label className="menu-toggle__button" htmlFor={id}>
        <span className="menu-toggle__icon" />
      </label>
    </>
  );
}

MenuToggle.propTypes = {
  id: PropTypes.string.isRequired
}

export default MenuToggle;