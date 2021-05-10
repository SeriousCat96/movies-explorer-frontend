import React from 'react';

export default function useFormDefaultValues(inputs) {
  const values = {};
  Object.assign(values, ...inputs
    .filter((input) => input.value !== undefined || input.defaultChecked !== undefined)
    .map(
      (input) => {
        switch (input.type) {
          case 'checkbox': return { [input.name]: input.defaultChecked };
          default: return { [input.name]: input.value };
        }
      }
    )
  );

  const [defaults] = React.useState(values)

  return defaults;
}