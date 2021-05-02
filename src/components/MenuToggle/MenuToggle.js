import React from 'react';
import './MenuToggle.css';

function MenuToggle() {
  return (
    <>
      <input id="btn" className="menu-toggle" type="checkbox" />
      <label className="menu-toggle__button" htmlFor="btn">
        <span className="menu-toggle__icon" />
      </label>
    </>
  );
}

export default MenuToggle;