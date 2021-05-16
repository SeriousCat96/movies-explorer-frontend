import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Main from '../Main/Main.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';

const Movies = ({ movies, savedMovies, onSearch, onFilter, onAction, isLoading }) => {
  return (
    <>
      <Header />
      <Main>
        <SearchForm onSearch={onSearch} onFilter={onFilter} />
        <MoviesCardList
          isLoading={isLoading}
          movies={movies}
          savedMovies={savedMovies}
          onMovieButtonClick={onAction}
        />
      </Main>
      <Footer />
    </>
 )
}

export default Movies;