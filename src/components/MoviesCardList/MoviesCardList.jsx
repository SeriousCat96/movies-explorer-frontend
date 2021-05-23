import React from 'react';
import cx from 'classnames';
import List from '../List/List';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import useWindowSize from '../../hooks/useWindowSize';
import {
  RENDERED_ITEMS_COUNT_1024,
  RENDERED_ITEMS_COUNT_768,
  RENDERED_ITEMS_COUNT_320,
  TO_LOAD_ITEMS_COUNT_1024,
  TO_LOAD_ITEMS_COUNT_768,
  TO_LOAD_ITEMS_COUNT_320
} from '../../utils/constants';
import PropTypes from 'prop-types';
import './MoviesCardList.css';

const MoviesCardList = ({ movies, savedMovies, isLoading, onMovieButtonClick, errorMessage }) => {
  const [renderedItemsCount, setRenderedItemsCount] = React.useState([]);
  const [toLoadItemsCount, setToLoadItemsCount] = React.useState(0);
  const [renderedItems, setRenderedItems] = React.useState([]);

  const windowSize = useWindowSize(200);

  const setLayout = React.useCallback(
    () => {
      if (windowSize.width >= 1024) {
        setRenderedItemsCount(RENDERED_ITEMS_COUNT_1024);
        setToLoadItemsCount(TO_LOAD_ITEMS_COUNT_1024);
      } else if (windowSize.width > 568 && windowSize.width < 1024) {
        setRenderedItemsCount(RENDERED_ITEMS_COUNT_768);
        setToLoadItemsCount(TO_LOAD_ITEMS_COUNT_768);
      } else {
        setRenderedItemsCount(RENDERED_ITEMS_COUNT_320);
        setToLoadItemsCount(TO_LOAD_ITEMS_COUNT_320);
      }
    },
    [windowSize.width]
  );

  const onButtonMoreClick = () => {
    setRenderedItems(i => [...i, ...movies.slice(renderedItems.length, renderedItems.length + toLoadItemsCount)]);
  }

  React.useEffect(
    () =>  setLayout(),
    [setLayout]
  );

  React.useEffect(
    () => {
      movies && setRenderedItems(m => (
        movies.slice(
          0,
          m.length > renderedItemsCount ? m.length : renderedItemsCount
        )
      ));
    },
    [movies, renderedItemsCount]
  );

  return (
    <section className={cx('cards', 'app__section')}>
      {
        !isLoading ? (
          movies && movies.length ? (
            <>
              <List className="cards__items">
                {
                  renderedItems.map(((movie) => {
                    movie.saved = savedMovies && savedMovies.find((m) => m.movieId === movie.movieId);
                    return (
                      <MoviesCard
                        key={movie.movieId}
                        item={movie}
                        onMovieButtonClick={onMovieButtonClick}
                      />
                    );
                  }))
                }
              </List>
              {
                renderedItems.length < movies.length && <Button className="cards__load-btn" onClick={onButtonMoreClick}>Ещё</Button>
              }
            </>
          ) : (
            movies &&
            <p className="cards__text">
              {errorMessage || "Ничего не найдено"}
            </p>
          )
        ) : (
          <Preloader />
        )
      }
    </section>
 )
}

MoviesCardList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
}

export default MoviesCardList;