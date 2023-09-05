import './Movies.css';
import { useState, useEffect } from 'react';

import Header from '../Header/Header.js';
import SearhForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import Preloader from '../Preloader/Preloader.js';

import moviesApi from '../../utils/MoviesApi';

import {
  MONITOR_SCREEN_WIDTH,
  TABLET_SCREEN_WIDTH,
  MONITOR_CARDS_AMOUNT,
  TABLET_CARDS_AMOUNT,
  MOBILE_CARDS_AMOUNT,
  MONITOR_CARDS_PER_LOAD,
  TABLET_CARDS_PER_LOAD,
  MOBILE_CARDS_PER_LOAD,
  SHORTFILM_MAX_DURATION,
} from '../../utils/constants';

function Movies({ likedMovies, onLike }) {
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCardsCount, setVisibleCardsCount] = useState(12); //Число отображенных на странице фильмов
  const [totalMoviesCount, setTotalMoviesCount] = useState(0); // Общее число фильмов, полученных из API
  const [moviesPerLoad, setMoviesPerLoad] = useState(3); // Количество фильмов для загрузки при нажатии кнопки "Ещё"
  const [shortFilmChecked, setShortFilmChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiMovies, setApiMovies] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Функция для загрузки данных из localStorage при монтировании компонента
  useEffect(() => {
    const storedSearchQuery = localStorage.getItem('searchQuery');
    const storedShortFilmChecked = JSON.parse(
      localStorage.getItem('shortFilmChecked')
    );
    const storedDisplayedMovies = JSON.parse(
      localStorage.getItem('displayedMovies')
    );
    if (storedSearchQuery) {
      setSearchQuery(storedSearchQuery);
    }
    if (storedShortFilmChecked) {
      setShortFilmChecked(storedShortFilmChecked);
    }
    if (storedDisplayedMovies) {
      setDisplayedMovies(storedDisplayedMovies);
      setTotalMoviesCount(storedDisplayedMovies.length);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('displayedMovies', JSON.stringify(displayedMovies));
  }, [displayedMovies]);

  useEffect(() => {
    localStorage.setItem('shortFilmChecked', JSON.stringify(shortFilmChecked));
    handleSearchSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortFilmChecked]);

  useEffect(() => {
    function handleResize() {
      // В зависимости от ширины окна устанавливаем количество видимых карточек
      const width = window.innerWidth;
      if (width >= MONITOR_SCREEN_WIDTH) {
        setVisibleCardsCount(MONITOR_CARDS_AMOUNT);
        setMoviesPerLoad(MONITOR_CARDS_PER_LOAD);
      } else if (width >= TABLET_SCREEN_WIDTH && width < MONITOR_SCREEN_WIDTH) {
        setVisibleCardsCount(TABLET_CARDS_AMOUNT);
        setMoviesPerLoad(TABLET_CARDS_PER_LOAD);
      } else {
        setVisibleCardsCount(MOBILE_CARDS_AMOUNT);
        setMoviesPerLoad(MOBILE_CARDS_PER_LOAD);
      }
    }

    // Добавляем обработчик события изменения размера окна
    window.addEventListener('resize', handleResize);

    // Вызываем функцию handleResize при старте компонента
    handleResize();

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleSearchSubmit() {
    if (searchQuery !== '') {
      setIsLoading(true);
      setError(null);
      if (!isDataLoaded) {
        // Выполняем загрузку данных только при первом сабмите формы
        moviesApi
          .getMovies()
          .then((movies) => {
            setApiMovies(movies);
            setIsDataLoaded(true);
            filterMovies(movies);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          })
          .finally(() => {
            localStorage.setItem('searchQuery', searchQuery);
            setIsLoading(false);
          });
      } else {
        filterMovies(apiMovies);
        localStorage.setItem('searchQuery', searchQuery);
        setIsLoading(false);
      }
    }
  }

  function filterMovies(movies) {
    let filteredMovies = movies.filter(
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
    setTotalMoviesCount(filteredMovies.length);
  }

  const handleLoadMoreClick = () => {
    const nextVisibleCardsCount = Math.min(
      visibleCardsCount + moviesPerLoad,
      totalMoviesCount
    );
    setVisibleCardsCount(nextVisibleCardsCount);
  }; //Подгружаем столько, сколько осталось неподгружено, если осталось меньше, чем должно подгрузиться

  return (
    <div className='body'>
      <Header color={{ pink: false }} loggedIn={true} />
      <main className='movies'>
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
          <p className='movies__text'>{error}</p>
        ) : displayedMovies.length === 0 ? (
          searchQuery === '' ? (
            <></>
          ) : (
            <p className='movies__text'>Ничего не найдено</p>
          )
        ) : (
          <MoviesCardList
            moviesList={displayedMovies.slice(0, visibleCardsCount)}
            likedMovies={likedMovies}
            onLike={onLike}
          />
        )}
        {totalMoviesCount > visibleCardsCount && !isLoading && (
          <button
            className='movies-cards__button'
            onClick={handleLoadMoreClick}
          >
            Ещё
          </button>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
