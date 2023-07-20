import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movieData }) {
  const { pathname } = useLocation();

  const isLiked = (function () {
    return Math.random() < 0.5;
  })();

  const cardLikeButtonClassName = `card__like ${
    isLiked && 'card__like_active'
  }`;

  const cardButtonClassName =
    pathname === '/saved-movies' ? 'card__cross' : cardLikeButtonClassName;

  return (
    <li className='card'>
      <a
        className='card__link'
        href={movieData.trailerLink}
        rel='noopener noreferrer'
        target='_blank'
      >
        <img
          src={movieData.image}
          alt='Фото фильма'
          className='card__image'
        ></img>
      </a>
      <div className='card__wrapper'>
        <h2 className='card__title'>{movieData.nameRU}</h2>
        <button className={cardButtonClassName}></button>
      </div>
      <p className='card__duration'>{movieData.duration}</p>
    </li>
  );
}

export default MoviesCard;
