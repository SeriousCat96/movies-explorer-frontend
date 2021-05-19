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

const FormInput = ({ component: Component, useValidation,  ...props }) => (
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
  validationMessages,
  invalidate,
  customErrorMessage,
  useValidation
}) {
  const validation = useFormValidation({validationMessages});
  const defaults = useFormDefaultValues(inputs);
  const submitDisabled = (!validation.isValid || (invalidate && invalidate())) && useValidation;

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(validation.values);
  }

  React.useEffect(
    () => {
      if (useValidation) {
        const reset = validation.handeResetValidation;

        reset(defaults, {});

        return () => reset(defaults, {});
      }
    },
    [validation.handeResetValidation, defaults, useValidation, inputs.length]
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
              value={validation.values[input.name] || ''}
              error={validation.errors[input.name]}
              isInvalid={validation.errors[input.name] !== undefined && validation.errors[input.name] !== ''}
              pattern={input.pattern}
              onChange={
                (e) => {
                  validation.handleChange(e);
                  input.onChange && input.onChange(e);
                }
              }
              useValidation={useValidation}
            />
          </Fieldset>
        )
      )}
      <Button
        type="submit"
        className={cx('form__submit', submitClassName, { 'form__submit_disabled' : submitDisabled}) }
        disabled={submitDisabled}
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
    onChange: PropTypes.func,
  })),
  className: PropTypes.string,
  submitClassName: PropTypes.string,
  fieldsetClassName: PropTypes.string,
  submitTitle: PropTypes.string,
  validationMessages: PropTypes.object,
  useValidation: PropTypes.bool,
};

export default Form;
