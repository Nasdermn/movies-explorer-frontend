import './Login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header.js';
import { useFormWithValidation } from '../Validation/Validation.js';
import mainApi from '../../utils/MainApi';

function Login({ setLoginStatus }) {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const { setUserInfo } = useCurrentUserContext();
  const [errorText, setErrorText] = useState('');

  function handleUserAuthorization(event) {
    event.preventDefault();

    if (isValid) {
      mainApi
        .signin(values.email, values.password)
        .then((data) => {
          console.log(data);
          if (data.token) {
            localStorage.setItem('jwt', data.token);
            mainApi.getUser(data.token).then((res) => {
              if (res) {
                setLoginStatus(true);
                setUserInfo({ name: res.name, email: res.email });
                navigate('/movies', { replace: true });
              }
            });
          }
        })
        .catch((err) => {
          setErrorText(err.message);
        });
    }
  }

  return (
    <div className='body'>
      <div className='wrapper'>
        <Header color={{ pink: false }} loggedIn={false} />
        <main className='login'>
          <h1 className='login__title'>Рады видеть!</h1>
          <form
            className='login__form'
            onSubmit={handleUserAuthorization}
            noValidate
          >
            <label className='login__label'>
              <span className='login__input-title'>E-mail</span>
              <input
                className='login__input'
                name='email'
                type='email'
                id='login-input-email'
                required
                placeholder='Введите email'
                value={values.email || ''}
                onChange={handleChange}
              />
              {errors.email && (
                <span className='login__input-error'>{errors.email}</span>
              )}
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
                value={values.password || ''}
                onChange={handleChange}
              />
              {errors.password && (
                <span className='login__input-error'>{errors.password}</span>
              )}
            </label>
            <button
              className={`login__button ${
                !isValid ? '' : 'login__button_enabled'
              }`}
              type='submit'
              disabled={!isValid}
            >
              Войти
            </button>
            <p className='login__text'>
              Ещё не зарегистрированы? &nbsp;
              <Link to='/signup' className='login__link'>
                Регистрация
              </Link>
            </p>
            {errorText && (
              <span className='login__input-error'>{errorText}</span>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}

export default Login;
