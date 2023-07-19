import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesList }) {
  return (
    <section className='movies-cards'>
      <ul className='movies-cards__list'>
        {moviesList.map((movie) => (
          <MoviesCard movieData={movie} />
        ))}
      </ul>
      <button className='movies-cards__button'>Ещё</button>
    </section>
  );
}

export default MoviesCardList;
