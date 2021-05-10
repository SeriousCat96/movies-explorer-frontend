import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './Toggle.css';

function Toggle({ id, name, className, labelClassName, children, checked, defaultChecked, onChange }) {
  return (
    <label className={cx('toggle', labelClassName)} htmlFor={id}>
      <input
          id={id}
          name={name}
          type="checkbox"
          className={cx('toggle__switch', className)}
          defaultChecked={defaultChecked || checked}
          onChange={onChange}
        />
        <span className="toggle__slider"></span>
        <span className="toogle__caption">{children}</span>
    </label>
  );
}

Toggle.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  children: PropTypes.string,
  onChange: PropTypes.func,
}

export default Toggle;
