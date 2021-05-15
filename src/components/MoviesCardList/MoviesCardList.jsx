import React from 'react';
import cx from 'classnames';
import List from '../List/List';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import PropTypes from 'prop-types';
import './MoviesCardList.css';

const MoviesCardList = ({ movies, savedMovies, isLoading, onMovieButtonClick }) => {
  const [offset, setOffset] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [toLoad, setToLoad] = React.useState(0);

  const setCardsLayout = React.useCallback(
    () => {
      const width = window.innerWidth;

      if (width > 1024) {
        setCount(c => c ? c : c + 12);
        setOffset(o => count ? o : o + 12);
        setToLoad(3);
      } else if (width > 480 && width < 1024) {
        setCount(c => c ? c : c + 8);
        setOffset(o => count ? o : o + 8);
        setToLoad(2);
      } else {
        setCount(c => c ? c : c + 5);
        setOffset(o => count ? o : o + 5);
        setToLoad(2);
      }
    },
    [setCount, setOffset, setToLoad, count]
  )

  const handleResize = React.useCallback(
    () => setTimeout(setCardsLayout, 200),
    [setCardsLayout]
  );

  const onButtonMoreClick = () => {
    setCount(c => c + toLoad);
    setOffset(o => o + toLoad);
  }

  React.useEffect(
    () => {
      window.addEventListener('resize', handleResize);
      setCardsLayout();

      return () => window.removeEventListener('resize', handleResize);
    },
    [handleResize, setCardsLayout]
  );

  return (
    <section className={cx('cards', 'app__section')}>
      {
        !isLoading ? (
          (movies && movies.length) || !savedMovies ?  (
            <>
              <List className="cards__items">
                {
                  movies.slice(offset, offset + toLoad + 1).map(((movie) => {
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
                count < movies.length && <Button className="cards__load-btn" onClick={onButtonMoreClick}>Ещё</Button>
              }
            </>
          ) : (
            movies && <p>Ничего не найдено</p>
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