import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';

const SavedMovies = ({ movies, onSearch, onFilter, onAction, isLoading, errorMessage }) => {
  return (
    <>
      <Header />
      <Main>
        <SearchForm onSearch={onSearch} onFilter={onFilter} />
        <MoviesCardList
          isLoading={isLoading}
          movies={movies}
          onMovieButtonClick={onAction}
          errorMessage={errorMessage}
        />
      </Main>
      <Footer />
    </>
 )
}

export default SavedMovies;