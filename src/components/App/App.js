import './App.css';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useCurrentUserContext } from '../../contexts/CurrentUserContext.js';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute.js';

import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import NotFound from '../NotFound/NotFound.js';
import Preloader from '../Preloader/Preloader.js';
import mainApi from '../../utils/MainApi';

function App() {
  const { loggedIn, setLoggedIn, setUserInfo } = useCurrentUserContext();
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки
  const [likedMovies, setLikedMovies] = useState([]);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    const isUserLogged = () => {
      //проверяем, не истёк ли токен (больше ли дата его истечения в секундах, чем текущая дата в секундах)
      const tokenStatus = () => {
        if (jwt) {
          return jwt_decode(jwt).exp - Math.floor(Date.now() / 1000) > 86400
            ? 1
            : 2;
        }
        return 3;
      };
      if (loggedIn && tokenStatus() === 1) {
        Promise.all([mainApi.getUser(jwt), mainApi.getSavedMovies()])
          .then(([apiUser, apiMovies]) => {
            //Отрисовка профиля
            setUserInfo({ name: apiUser.name, email: apiUser.email });
            //Отрисовка карточек
            setLikedMovies(apiMovies);
            //Остановка загрузки
            setIsLoading(false);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
        if (tokenStatus() === 2) {
          // Токен истечет менее, чем через день! выходим из системы
          localStorage.removeItem('jwt');
          setLoggedIn(false);
        }
      }
    };

    isUserLogged();

    //будем проверять токен раз в день, если вдруг пользователь будет несколько дней сидеть на сайте
    const tokenCheckInterval = setInterval(isUserLogged, 86400 * 1000);

    return () => {
      // Очищаем интервал при размонтировании компонента
      clearInterval(tokenCheckInterval);
    };
  }, [loggedIn, setUserInfo, jwt, setLoggedIn]);

  const handleDeleteCard = (id) => {
    mainApi
      .deleteSavedMovie(id)
      .then((res) => {
        if (res.message === 'Карточка с фильмом удалена') {
          setLikedMovies(likedMovies.filter((m) => m._id !== id));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLikeCard = (movie) => {
    const likedMovieToDelete = likedMovies.find(
      (likedMovie) => likedMovie.movieId === movie.id
    );
    if (likedMovieToDelete) {
      mainApi
        .deleteSavedMovie(likedMovieToDelete._id)
        .then((res) => {
          if (res.message === 'Карточка с фильмом удалена') {
            setLikedMovies((prevLikedMovies) =>
              prevLikedMovies.filter(
                (likedMovie) => likedMovie.movieId !== movie.id
              )
            );
          }
        })
        .catch((err) => console.log(err));
    } else {
      mainApi
        .saveMovie(movie)
        .then((savedMovie) => {
          setLikedMovies((prevLikedMovies) => [...prevLikedMovies, savedMovie]);
        })
        .catch((err) => console.log(err));
    }
  };

  if (isLoading) {
    return (
      <div className='preloader__wrapper'>
        <Preloader />
      </div>
    );
  } else {
    return (
      <div className='page'>
        <Routes>
          <Route path='/' element={<Main loggedIn={loggedIn} />} />
          <Route
            path='/movies'
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Movies}
                likedMovies={likedMovies}
                onLike={handleLikeCard}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={SavedMovies}
                likedMovies={likedMovies}
                onDelete={handleDeleteCard}
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRouteElement loggedIn={loggedIn} element={Profile} />
            }
          />
          <Route
            path='/signin'
            element={
              loggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <Login setLoginStatus={setLoggedIn} />
              )
            }
          />
          <Route
            path='/signup'
            element={
              loggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <Register setLoginStatus={setLoggedIn} />
              )
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    );
  }
}

export default App;
