import { Link } from 'react-router-dom';
import Header from '../Header/Header.js';

function Login() {
  return (
    <body className='body'>
      <div className='login__wrapper'>
        <Header color={{ pink: false }} loggedIn={false} />
        <section className='login'>
          <h2 className='login__title'>Рады видеть!</h2>
          <form className='login__form'>
            <label className='login__label'>
              <span className='login__input-title'>E-mail</span>
              <input
                className='login__input'
                name='email'
                type='email'
                id='login-input-email'
                required
                placeholder='Введите email'
              />
            </label>
            <label className='login__label'>
              <span className='login__input-title'>Пароль</span>
              <input
                className='login__input'
                name='password'
                type='password'
                id='login-input-password'
                required
                placeholder='Введите пароль'
              />
              <span className='login__input-error'>Что-то пошло не так...</span>
            </label>
            <button className='login__button'>Войти</button>
            <p className='login__text'>
              Ещё не зарегистрированы? &nbsp;
              <Link to='/signup' className='login__link'>
                Регистрация
              </Link>
            </p>
          </form>
        </section>
      </div>
    </body>
  );
}

export default Login;
