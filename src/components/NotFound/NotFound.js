import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <body className='body'>
      <main className='error'>
        <h1 className='error__title'>404</h1>
        <h2 className='error__subtitle'>Страница не найдена</h2>
        <Link to='/' className='error__link'>
          Назад
        </Link>
      </main>
    </body>
  );
}

export default NotFound;
