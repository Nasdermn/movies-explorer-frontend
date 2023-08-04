import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect } from 'react';

function MoviesCardList({ moviesList, likedMovies, onLike, onDelete }) {
  useEffect(() => {}, [onLike, onDelete]);

  const updatedMoviesList = moviesList.map((movie) => {
    const isLiked = likedMovies.some(
      (likedMovie) => likedMovie.movieId === movie.id
    );
    return {
      ...movie,
      isLiked,
    };
  });
  return (
    <section className='movies-cards'>
      <ul className='movies-cards__list'>
        {updatedMoviesList.map((movie) => (
          <MoviesCard
            key={movie.movieId || movie.id}
            movieData={movie}
            onLike={onLike}
            onDelete={onDelete}
            isLiked={movie.isLiked}
          />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
