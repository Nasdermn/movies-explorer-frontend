import './Register.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header.js';

function Register() {
  return (
    <body className='body'>
      <div className='wrapper'>
        <Header color={{ pink: false }} loggedIn={false} />
        <main className='register'>
          <h1 className='register__title'>Добро пожаловать!</h1>
          <form className='register__form'>
            <label className='register__label'>
              <span className='register__input-title'>Имя</span>
              <input
                className='register__input'
                name='name'
                type='text'
                id='register-input-name'
                required
                placeholder='Введите имя'
                minLength={2}
                maxLength={30}
              />
            </label>
            <label className='register__label'>
              <span className='register__input-title'>E-mail</span>
              <input
                className='register__input'
                name='email'
                type='email'
                id='register-input-email'
                required
                placeholder='Введите email'
              />
            </label>
            <label className='register__label'>
              <span className='register__input-title'>Пароль</span>
              <input
                className='register__input'
                name='password'
                type='password'
                id='register-input-password'
                required
                placeholder='Введите пароль'
              />
              <span className='register__input-error'>
                Что-то пошло не так...
              </span>
            </label>
            <button className='register__button' type='submit'>
              Зарегистрироваться
            </button>
            <p className='register__text'>
              Уже зарегистрированы? &nbsp;
              <Link to='/signin' className='register__link'>
                Войти
              </Link>
            </p>
          </form>
        </main>
      </div>
    </body>
  );
}

export default Register;
