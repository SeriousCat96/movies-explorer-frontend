import React from 'react';

/**
 * Выполняет поиск объектов в указанном хранилище.
 *
 * @param {() => Promise<object[]>} getRepoCallback Callback, возвращающий хранилище объектов.
 * @param  {...[name: string, state: any, filter: (item: any, value: any) => boolean]} filters Список фильтров поиска
 * @returns {[object[], (query: object) => void]} Результаты поиска.
 */
export default function useSearch(getRepoCallback, ...filters) {
  const [results, setResults] = React.useState(null);
  const [filterList] = React.useState(filters);
  /**
   * Выполняет поиск объектов в репозитории.
   * @param {object} query Объект запроса.
   */
  const search = React.useCallback(
    (query) => {
      return getRepoCallback()
        .then((items) => {

          const filteredItems = (
            query
            && Object.keys(query).length
            && items.filter((item) => (
              filterList.reduce((filterResult, currentFilter) => {
                const [name,, filter] = currentFilter;
                let res = true;

                if(query[name]) {
                  res = filter(item, query[name]);
                }

                return filterResult && res;
              }, true)
            )))
            || items;

          setResults(() => filteredItems);
        })
        .catch((err) => console.log(err));
    },
    [getRepoCallback, filterList]
  );


  return [
    results,
    search,
  ];
}