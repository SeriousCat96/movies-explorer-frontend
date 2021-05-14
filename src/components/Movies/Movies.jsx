import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Main from '../Main/Main.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';

const Movies = ({ movies, onSearch, isLoading }) => {
  return (
    <>
      <Header />
      <Main>
        <SearchForm onSearch={onSearch} />
        <MoviesCardList isLoading={isLoading} movies={movies}/>
      </Main>
      <Footer />
    </>
 )
}

export default Movies;