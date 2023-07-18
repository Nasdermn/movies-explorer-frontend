import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='body'>
      <section className='not_found'>
        <h2 className='not_found__title'>404</h2>
        <h3 className='not_found__subtitle'>Страница не найдена</h3>
        <Link to='/' className='not_found__link'>
          Назад
        </Link>
      </section>
    </div>
  );
}

export default NotFound;
