import React from 'react';

/**
 * Выполняет поиск объектов в указанном хранилище.
 *
 * @param {() => Promise<void | object[]>} getStorageCallback Callback, возвращающий хранилище объектов.
 * @param  {...[name: string, state: any, filter: (item: any, value: any) => boolean]} filters Список фильтров поиска
 * @returns {[object[], (query: object) => void]} Результаты поиска.
 */
export default function useSearch(getStorageCallback, ...filters) {
  const [results, setResults] = React.useState(null);
  const [filterList] = React.useState(filters);
  /**
   * Выполняет поиск объектов в репозитории.
   * @param {object} query Объект запроса.
   */
  const search = React.useCallback(
    (query) => {
      return getStorageCallback()
        .then((items) => {

          const filteredItems = (
            query
            && Object.keys(query).length
            && items.filter((item) => (
              filterList.reduce((filterResult, currentFilter) => {
                const [name,, filter] = currentFilter;
                let result = true;

                if(query[name]) {
                  result = filter(item, query[name]);
                }

                return filterResult && result;
              }, true)
            )))
            || items;

          setResults(() => filteredItems);
          return Promise.resolve(filteredItems);
        })
        .catch((err) => console.log(err));
    },
    [getStorageCallback, filterList]
  );


  return [
    results,
    search,
  ];
}