import cx from 'classnames';
import List from '../List/List';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import PropTypes from 'prop-types';
import './MoviesCardList.css';

const MoviesCardList = ({ movies, isLoading, onMovieButtonClick }) => {
  return (
    <section className={cx('cards', 'app__section')}>
      {
        !isLoading ? (
          movies && movies.length ? (
            <>
              <List className="cards__items">
                {movies.map(((movie) => (
                  <MoviesCard
                    key={movie.movieId}
                    item={movie}
                    onMovieButtonClick={onMovieButtonClick}
                  />
                )))}
              </List>
              <Button className="cards__load-btn">Ещё</Button>
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

MoviesCardList.defaultProps = {
  movies: [],
}

export default MoviesCardList;