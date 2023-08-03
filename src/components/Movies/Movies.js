import './Movies.css';
import { useState, useEffect } from 'react';

import Header from '../Header/Header.js';
import SearhForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import Preloader from '../Preloader/Preloader.js';

import moviesApi from '../../utils/MoviesApi';
function Movies({ likedMovies, setLikedMovies, onLike }) {
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCardsCount, setVisibleCardsCount] = useState(12); //Число отображенных на странице фильмов
  const [totalMoviesCount, setTotalMoviesCount] = useState(0); // Общее число фильмов, полученных из API
  const [moviesPerLoad, setMoviesPerLoad] = useState(3); // Количество фильмов для загрузки при нажатии кнопки "Ещё"
  const [shortFilmChecked, setShortFilmChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
  }, [shortFilmChecked]);

  useEffect(() => {
    function handleResize() {
      // В зависимости от ширины окна устанавливаем количество видимых карточек
      const width = window.innerWidth;
      if (width >= 1280) {
        setVisibleCardsCount(12);
        setMoviesPerLoad(3);
      } else if (width >= 768 && width < 1280) {
        setVisibleCardsCount(8);
        setMoviesPerLoad(2);
      } else {
        setVisibleCardsCount(5);
        setMoviesPerLoad(2);
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

      moviesApi
        .getMovies()
        .then((res) => {
          let filteredMovies = res.filter(
            (movie) =>
              movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (shortFilmChecked) {
            filteredMovies = filteredMovies.filter(
              (movie) => movie.duration <= 40
            );
          }
          setDisplayedMovies(filteredMovies);
          setTotalMoviesCount(filteredMovies.length);
          localStorage.setItem('searchQuery', searchQuery);
        })
        .catch((err) => {
          setError(
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
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
            setLikedMovies={setLikedMovies}
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
