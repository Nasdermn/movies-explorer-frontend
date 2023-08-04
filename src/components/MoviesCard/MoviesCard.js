import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_URL } from '../../utils/constants';
import { Timeconverter } from '../../utils/Timeconverter';

function MoviesCard({ movieData, onLike, onDelete, isLiked }) {
  const { pathname } = useLocation();
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleLikeClick = async () => {
    try {
      await onLike(movieData);
      setLiked(!liked);
    } catch (error) {
      console.log('Произошла ошибка при лайке фильма:', error);
    }
  };

  const handleCrossClick = () => {
    onDelete(movieData._id);
  };

  return (
    <li className='card'>
      <a
        className='card__link'
        href={movieData.trailerLink}
        rel='noopener noreferrer'
        target='_blank'
      >
        <img
          src={
            pathname === '/saved-movies'
              ? movieData.image
              : `${API_URL}${movieData.image.url}`
          }
          alt='Фото фильма'
          className='card__image'
        ></img>
      </a>
      <div className='card__wrapper'>
        <h2 className='card__title'>{movieData.nameRU}</h2>
        {pathname === '/movies' ? (
          <button
            className={`card__like ${liked ? 'card__like_active' : ''}`}
            onClick={handleLikeClick}
          />
        ) : (
          <button className='card__cross' onClick={handleCrossClick} />
        )}
      </div>
      <p className='card__duration'>{Timeconverter(movieData.duration)}</p>
    </li>
  );
}

export default MoviesCard;
