import React from 'react';
import cx from 'classnames';
import useFormValidation from '../../hooks/useFormValidation';
import PropTypes from 'prop-types';
import Button from '../Button/Button.jsx';
import './Form.css';
import Input from '../Input/Input';
import ValidableInput from '../ValidableInput/ValidableInput';

const FormInput = ({ component: Component, useValidation, ...props }) => (
  Component ? (
    <Component {...props} />
  ) : (
    useValidation ? <ValidableInput {...props} /> : <Input {...props} />
  )
);

function Form({
  name,
  inputs,
  className,
  submitClassName,
  submitTitle,
  onSubmit,
  useValidation
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault(evt);
    onSubmit(values);
  }

  const {
    values,
    errors,
    isValid,
    handleChange,
    handeResetValidation
  } = useFormValidation(inputs);

  const formRef = React.useRef();

  React.useEffect(
    () => {
      if (useValidation) {
        const form = formRef.current;
        handeResetValidation(form);

        return () => handeResetValidation(form);
      }
    },
    [handeResetValidation, formRef, useValidation]
  );

  return (
    <form
      ref={formRef}
      name={name}
      className={cx('form', className)}
      onSubmit={handleSubmit}
      noValidate
    >
      {inputs.map(
        (input) => (
          <FormInput
            key={input.id}
            value={values[input.name] || ''}
            error={errors[input.name]}
            isInvalid={errors[input.name] !== undefined && errors[input.name] !== ''}
            onChange={handleChange}
            useValidation={useValidation}
            {...input}
          />
        )
      )}
      <Button
        type="submit"
        className={cx('form__submit', submitClassName, { 'form__submit_disabled' :  !isValid && useValidation})}
        disabled={!isValid && useValidation}
      >
        {submitTitle}
      </Button>
    </form>
  );
}

Form.propTypes = {
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  inputs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    component: PropTypes.elementType,
    className: PropTypes.string,
    labelClassName: PropTypes.string,
    labelText: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    autoComplete: PropTypes.string,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
  })),
  className: PropTypes.string,
  submitClassName: PropTypes.string,
  submitTitle: PropTypes.string,
  useValidation: PropTypes.bool,
};

export default Form;
