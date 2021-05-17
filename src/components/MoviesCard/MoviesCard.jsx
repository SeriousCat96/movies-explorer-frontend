import Button from '../Button/Button';
import { Route, Switch } from 'react-router';
import cx from 'classnames';
import './MoviesCard.css';
import Link from '../Link/Link';

const MoviesCard = ({ item, onMovieButtonClick }) => {
  return (
    <article className="card">
      <Link to={item.trailer}>
        <img className="card__image" src={item.thumbnail} alt={item.alt}/>
      </Link>
      <div className="card__info">
        <h3 className="card__title">{item.name}</h3>
        <Switch>
          <Route path='/movies'>
            <Button
              onClick={onMovieButtonClick.bind(undefined, item)}
              className = {
                cx('card__button', {
                  'card__button_type_checked-like' : item.saved,
                  'card__button_type_unchecked-like': !item.saved,
                })
              }
            />
          </Route>
          <Route path='/saved-movies'>
            <Button
              onClick={onMovieButtonClick.bind(undefined, item)}
              className={cx('card__button', 'card__button_type_remove')}
            />
          </Route>
        </Switch>
        <time dateTime={item.durationString} className="card__text">{item.durationString}</time>
      </div>
    </article>
 )
}

export default MoviesCard;