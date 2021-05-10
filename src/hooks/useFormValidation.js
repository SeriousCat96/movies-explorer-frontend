import React from 'react';

export default function useFormValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt
      .target
      .closest('form')
      .checkValidity());
  }

  const handeResetValidation = React.useCallback(
    (form, values={}) => {
      setValues(values);
      setErrors({});
      setIsValid(form ? form.checkValidity() : false);
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