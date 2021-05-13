import React from 'react';
import cx from 'classnames';
import useFormValidation from '../../hooks/useFormValidation';
import useFormDefaultValues from '../../hooks/useFormDefaultValues';
import PropTypes from 'prop-types';
import Fieldset from '../Fieldset/Fieldset.jsx';
import Button from '../Button/Button.jsx';
import Input from '../Input/Input';
import ValidableInput from '../ValidableInput/ValidableInput';
import './Form.css';

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
  fieldsetClassName,
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
  } = useFormValidation();

  const defaults = useFormDefaultValues(inputs);

  React.useEffect(
    () => {
      if (useValidation) {
        const valid = Object.keys(defaults).length > 0 || inputs.length === 0;
        handeResetValidation(defaults, {}, valid);

        return () => handeResetValidation(defaults, {}, valid);
      }
    },
    [handeResetValidation, defaults, useValidation, inputs.length]
  );

  return (
    <form
      name={name}
      className={cx('form', className)}
      onSubmit={handleSubmit}
      noValidate
    >
      {inputs.map(
        (input) => (
          <Fieldset key={input.id} className={fieldsetClassName}>
            <FormInput
              {...input}
              value={values[input.name] || ''}
              error={errors[input.name]}
              isInvalid={errors[input.name] !== undefined && errors[input.name] !== ''}
              pattern={input.pattern}
              onChange={handleChange}
              useValidation={useValidation}
            />
          </Fieldset>
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
    pattern: PropTypes.instanceOf(RegExp),
    required: PropTypes.bool,
    autoComplete: PropTypes.string,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
  })),
  className: PropTypes.string,
  submitClassName: PropTypes.string,
  fieldsetClassName: PropTypes.string,
  submitTitle: PropTypes.string,
  useValidation: PropTypes.bool,
};

export default Form;
