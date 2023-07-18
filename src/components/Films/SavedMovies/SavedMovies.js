import { useState, useEffect } from 'react';

import exampleMovies from '../../../utils/examplemovies.js';

import Header from '../../Header/Header.js';
import SearhForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../../Footer/Footer.js';
function SavedMovies() {
  const [displayedMovies, setDisplayedMovies] = useState([]);

  useEffect(() => {
    setDisplayedMovies(exampleMovies);
  });
  return (
    <div className='body'>
      <Header color={{ pink: false }} loggedIn={true} />
      <section className='movies'>
        <SearhForm />
        <MoviesCardList moviesList={displayedMovies} />
      </section>
      <Footer />
    </div>
  );
}

export default SavedMovies;
