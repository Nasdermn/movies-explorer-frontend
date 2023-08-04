import './NotFound.css';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className='body'>
      <main className='error'>
        <h1 className='error__title'>404</h1>
        <h2 className='error__subtitle'>Страница не найдена</h2>
        <button className='error__link' onClick={goBack}>
          Назад
        </button>
      </main>
    </div>
  );
}

export default NotFound;
