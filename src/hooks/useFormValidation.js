import React from 'react';

export default function useFormValidation({validationMessages}) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const setValidationMessage = (evt) => {
    if (validationMessages) {
      const validityState = evt.target.validity;

      validityState.badInput ? evt.target.setCustomValidity(validationMessages.badInput) : evt.target.setCustomValidity('');
      validityState.patternMismatch ? evt.target.setCustomValidity(validationMessages.patternMismatch) : evt.target.setCustomValidity('');
      validityState.rangeOverflow ? evt.target.setCustomValidity(validationMessages.rangeOverflow) : evt.target.setCustomValidity('');
      validityState.rangeUnderflow ? evt.target.setCustomValidity(validationMessages.rangeUnderflow) : evt.target.setCustomValidity('');
      validityState.stepMismatch ? evt.target.setCustomValidity(validationMessages.stepMismatch) : evt.target.setCustomValidity('');
      validityState.tooLong ? evt.target.setCustomValidity(validationMessages.tooLong) : evt.target.setCustomValidity('');
      validityState.tooShort ? evt.target.setCustomValidity(validationMessages.tooShort) : evt.target.setCustomValidity('');
      validityState.typeMismatch ? evt.target.setCustomValidity(validationMessages.typeMismatch) : evt.target.setCustomValidity('');
      validityState.valueMissing ? evt.target.setCustomValidity(validationMessages.valueMissing) : evt.target.setCustomValidity('');
  }
  };

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;

    setValidationMessage(evt);

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt
      .target
      .closest('form')
      .checkValidity());
  };

  const handeResetValidation = React.useCallback(
    (values = {}, errors = {}, isValid = false) => {
      setValues(values);
      setErrors(errors);
      setIsValid(isValid);
    },
    [setValues, setErrors, setIsValid]);

  return {
    values,
    errors,
    isValid,
    handleChange,
    handeResetValidation,
  }
}