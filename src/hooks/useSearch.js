import React from 'react';

/**
 * Выполняет поиск объектов в указанном хранилище.
 *
 * @param {() => Promise<object[]>} getRepo Callback, возвращающий хранилище объектов.
 * @param  {...[name: string, state: any, filter: (item: any, value: any) => boolean]} filters Список фильтров поиска
 * @returns {[object[], (searchQuery: object) => void]} Результаты поиска.
 */
export default function useSearch(getRepo, ...filters) {
  const [repo, setRepo] = React.useState([]);
  const [results, setResults] = React.useState([]);

  /**
   * Выполняет поиск объектов в репозитории.
   * @param {object} searchQuery
   */
  async function search(searchQuery) {
    setRepo(await getRepo());

    const items = repo.filter((item) => (
      filters.reduce((filterResult, currentFilter) => {
        const [name, state, filter] = currentFilter;
        const res = filterResult && filter(item, searchQuery[name]);
        return res;
      }, true)
    ));

    setResults(items);
  }


  return [
    results,
    search,
  ];
}