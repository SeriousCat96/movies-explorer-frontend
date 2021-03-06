import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label/Label.jsx';
import cx from 'classnames';
import './Input.css';

function Input({
  id,
  type,
  value,
  className,
  labelClassName,
  checked,
  defaultChecked,
  children,
  labelText,
  pattern,
  ...rest
}) {
  return (

    <>
      <Label className={labelClassName} htmlFor={id}>
        {labelText}
        <input
          {...rest}
          className={cx('input', className)}
          id={id}
          type={type}
          value={value}
          defaultChecked={defaultChecked || checked}
          pattern={pattern && pattern.source}
        />
      </Label>
      {children}
    </>
  );
}

Input.defaultProps = {
  name: '',
  value: '',
  type: 'text',
  placeholder: '',
  required: false,
  defaultChecked: false,
  autoComplete: 'off',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  pattern: PropTypes.instanceOf(RegExp),
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  autoComplete: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default Input;