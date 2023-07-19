import './Movies.css';
import { useState, useEffect } from 'react';

import exampleMovies from '../../utils/examplemovies.js';

import Header from '../Header/Header.js';
import SearhForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
function Movies() {
  const [displayedMovies, setDisplayedMovies] = useState([]);

  useEffect(() => {
    setDisplayedMovies(exampleMovies);
  }, []);
  return (
    <body className='body'>
      <Header color={{ pink: false }} loggedIn={true} />
      <main className='movies'>
        <SearhForm />
        <MoviesCardList moviesList={displayedMovies} />
        <button className='movies-cards__button'>Ещё</button>
      </main>
      <Footer />
    </body>
  );
}

export default Movies;
