import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Label.css';

function Label({className, children, htmlFor, ...props}) {
  return (
    <label
      className={cx('label', className) }
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
}

Label.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  children: PropTypes.node,
};

export default Label;
