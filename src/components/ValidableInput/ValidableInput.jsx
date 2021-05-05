import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/Input.jsx';
import InputError from '../InputError/InputError.jsx';
import cx from 'classnames';

function ValidableInput({
  id,
  className,
  error,
  isInvalid,
  ...props
}) {
  return (
    <>
      <Input
        id={id}
        className={cx(className, {'input__error' : isInvalid})}
        {...props}
      >
        {isInvalid &&
          <InputError id={id} isInvalid>
            {error}
          </InputError>
        }
      </Input>
    </>
  );
}

ValidableInput.defaultProps = {
  error: '',
  isInvalid: false,
};

ValidableInput.propTypes = {
  isInvalid: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string
};

export default ValidableInput;