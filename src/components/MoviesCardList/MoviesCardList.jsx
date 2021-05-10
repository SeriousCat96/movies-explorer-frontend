import cx from 'classnames';
import List from '../List/List';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import './MoviesCardList.css';

const MoviesCardList = ({ movies }) => {
  return (
    <section className={cx('cards', 'app__section')}>
      <List className="cards__items">
        {movies.map(((movie) => (
          <MoviesCard key={movie._id} {...movie} />
        )))}
      </List>
      <Button className="cards__load-btn">Ещё</Button>
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