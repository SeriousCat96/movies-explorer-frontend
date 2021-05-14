import Button from '../Button/Button';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './MoviesCard.css';

const MoviesCard = ({ name, imageUrl, saved, durationString }) => {
  return (
    <article className="card">
      <img className="card__image" src={imageUrl} alt={`Изображение фильма ${name}`}/>
      <div className="card__info">
        <h3 className="card__title">{name}</h3>
        <Switch>
          <Route path='/movies'>
            <Button
              className = {
                cx('card__button', {
                  'card__button_type_checked-like' : saved,
                  'card__button_type_unchecked-like': !saved,
                })
              }
            />
          </Route>
          <Route path='/saved-movies'>
            <Button className={cx('card__button', 'card__button_type_remove')} />
          </Route>
        </Switch>
        <span className="card__text">{durationString}</span>
      </div>
    </article>
 )
}

MoviesCard.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  durationString: PropTypes.string.isRequired,
  saved: PropTypes.bool,
}

MoviesCard.defaultProps = {
  saved: false,
}

export default MoviesCard;