import React from 'react';
import cx from 'classnames';
import List from '../List/List';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import PropTypes from 'prop-types';
import './MoviesCardList.css';

const MoviesCardList = ({ movies, savedMovies, isLoading, onMovieButtonClick }) => {
  const [toLoad, setToLoad] = React.useState(0);
  const [items, setItems] = React.useState([]);

  const setCardsLayout = React.useCallback(
    () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        movies && setItems(i => i.length
          ? i.length > movies.length ? movies.slice(0, i.length) : movies.slice(0, 12)
          : movies.slice(0, 12));
        setToLoad(3);
      } else if (width > 480 && width < 1024) {
        movies && setItems(i => i.length
          ? i.length > movies.length ? movies.slice(0, i.length) : movies.slice(0, 8)
          : movies.slice(0, 8))
        setToLoad(2);
      } else {
        movies && setItems(i => i.length
          ? i.length > movies.length ? movies.slice(0, i.length) : movies.slice(0, 5)
          : movies.slice(0, 5))
        setToLoad(2);
      }
    },
    [setItems, setToLoad, movies]
  )

  const handleResize = React.useCallback(
    () => setTimeout(setCardsLayout, 200),
    [setCardsLayout]
  );

  const onButtonMoreClick = () => {
    const offset = items.length;
    setItems(i => [...i, ...movies.slice(offset, offset + toLoad)]);
  }

  React.useEffect(
    () => {
      window.addEventListener('resize', handleResize);
      // setItems(movies || []);
      setCardsLayout();

      return () => {
        window.removeEventListener('resize', handleResize);

        setToLoad(0);
      }
    },
    [handleResize, setCardsLayout, movies]
  );

  return (
    <section className={cx('cards', 'app__section')}>
      {
        !isLoading ? (
          (movies && movies.length) ?  (
            <>
              <List className="cards__items">
                {
                  items.map(((movie) => {
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
                items.length < movies.length && <Button className="cards__load-btn" onClick={onButtonMoreClick}>Ещё</Button>
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