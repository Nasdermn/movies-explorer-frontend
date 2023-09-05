import './SavedMovies.css';
import { useState, useEffect } from 'react';

import Header from '../Header/Header.js';
import SearhForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import Preloader from '../Preloader/Preloader.js';

import { SHORTFILM_MAX_DURATION } from '../../utils/constants';

function SavedMovies({ likedMovies, onDelete }) {
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [shortFilmChecked, setShortFilmChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleSearchSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortFilmChecked]);

  useEffect(() => {
    setDisplayedMovies(likedMovies);
  }, [likedMovies]);

  function handleSearchSubmit() {
    setIsLoading(true);
    setError(null);
    let filteredMovies = likedMovies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (shortFilmChecked) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.duration <= SHORTFILM_MAX_DURATION
      );
    }
    setDisplayedMovies(filteredMovies);
    setIsLoading(false);
  }

  return (
    <div className='body'>
      <Header color={{ pink: false }} loggedIn={true} />
      <main className='saved-movies'>
        <SearhForm
          onSubmit={handleSearchSubmit}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          shortFilmChecked={shortFilmChecked}
          setShortFilmChecked={setShortFilmChecked}
        />
        {isLoading ? (
          <Preloader />
        ) : error ? (
          <p className='saved-movies__text'>{error}</p>
        ) : displayedMovies.length === 0 ? (
          <p className='saved-movies__text'>Ничего не найдено</p>
        ) : (
          <MoviesCardList
            moviesList={displayedMovies}
            likedMovies={likedMovies}
            onDelete={onDelete}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
