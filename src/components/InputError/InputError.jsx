import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './InputError.css';

function InputError({className, children, isInvalid, id}) {
  return (
    <span
      className={cx('input-error', className, { 'input-error_active' : isInvalid })}
      id={`${id}-error`}
    >
      {children}
    </span>
  );
}

InputError.propTypes = {
  isInvalid: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};


export default InputError;
