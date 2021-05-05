import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';

import img1 from '../../images/pic1.png'
import img2 from '../../images/pic2.png'
import img3 from '../../images/pic3.png'
import img4 from '../../images/pic4.png'
import img5 from '../../images/pic5.png'

const title = '33 слова о дизайне';
const duration = '1ч 42мин';
const movies = [
  {
    _id: 1,
    image: img1,
    nameRU: title,
    duration: duration,
    saved: true,
  },
  {
    _id: 2,
    image: img2,
    nameRU: title,
    duration: duration,
  },
  {
    _id: 3,
    image: img3,
    nameRU: title,
    duration: duration,
    saved: true,
  },
  {
    _id: 4,
    image: img4,
    nameRU: title,
    duration: duration,
    saved: true,
  },
  {
    _id: 5,
    image: img5,
    nameRU: title,
    duration: duration,
  },
]

const Movies = () => {
  return (
    <>
      <SearchForm />
      <MoviesCardList movies={movies}/>
    </>
 )
}

export default Movies;