import React from 'react';

export default function useFormDefaultValues(inputs) {
  const defaults = React.useMemo(
    () => {
      const values = {};
      Object.assign(values, ...inputs
        .filter((input) => input.value !== undefined || input.defaultChecked !== undefined)
        .map(
          (input) => {
            switch(input.type) {
              case 'checkbox': return { [input.name] : input.defaultChecked };
              default: return { [input.name] : input.value };
            }

          }));

      return values;
    },
    [inputs]
  );

  return defaults;
}