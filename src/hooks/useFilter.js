import React from 'react';

/**
 * Возвращает функцию-фильтр и объект, по которому идёт фильтрация.
 * @param {string} name Имя фильтра
 * @param {(item: any, value: any) => boolean} callback callback фильтра
 * @returns {[string, any, (item: any, value: any) => boolean]}
 */
export default function useFilter(name, callback) {
  const [valueState, setValueState] = React.useState();
  const filter = React.useCallback(
    (item, value) => {
      setValueState(value);
      return callback(item, value);
    },
    [setValueState, callback]
  );

  return [
    name,
    valueState,
    filter,
  ];
}