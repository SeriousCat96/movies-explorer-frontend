import React from 'react';
import useFormDefaultValues from './useFormDefaultValues';

export default function useFormValidation(inputs = [], resetTrigger = undefined) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const defaults = useFormDefaultValues(inputs);

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt
      .target
      .closest('.form')
      .checkValidity());
  }

  const handeResetValidation = React.useCallback(
    (form) => {
      setValues({...defaults});
      setErrors({});
      setIsValid(form ? form.checkValidity() : false);
    },
    [setValues, setErrors, setIsValid, defaults]);

  return {
    defaults,
    values,
    errors,
    isValid,
    handleChange,
    handeResetValidation,
  }
}