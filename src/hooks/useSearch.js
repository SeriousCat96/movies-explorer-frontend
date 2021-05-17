import React from 'react';

/**
 * Выполняет поиск объектов в указанном хранилище.
 *
 * @param {object | () => Promise<void | object[]>} storage Хранилище объектов.
 * @param  {...[name: string, state: any, filter: (item: any, value: any) => boolean]} filters Список фильтров поиска
 * @returns {[object[], (state: object[]) => void, (query: object) => void]} Результаты поиска.
 */
export default function useSearch(storage, ...filters) {
  const [results, setResults] = React.useState(null);
  const [filterList] = React.useState(filters);
  /**
   * Выполняет поиск объектов в репозитории.
   * @param {object} query Объект запроса.
   */
  const search = React.useCallback(
    (query) => {
      function searhAndFilter(items) {
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

        setResults(filteredItems);
        return Promise.resolve(filteredItems);
      }

      return typeof storage === 'function'
        ? (
          storage()
            .then((items) => searhAndFilter(items))
            .catch((err) => console.log(err))
        ) : (
          searhAndFilter(storage)
            .catch((err) => console.log(err))
        );
    },
    [storage, filterList]
  );


  return [
    results,
    setResults,
    search,
  ];
}