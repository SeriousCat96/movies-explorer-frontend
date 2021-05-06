import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';

import img1 from '../../images/pic1.png'
import img2 from '../../images/pic2.png'

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
]

const SavedMovies = () => {
  return (
    <>
      <Header />
      <Main>
        <SearchForm />
        <MoviesCardList movies={movies} />
      </Main>
      <Footer />
    </>
 )
}

export default SavedMovies;