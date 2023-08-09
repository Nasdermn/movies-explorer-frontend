import './Register.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header.js';
import { useFormWithValidation } from '../Validation/Validation.js';
import mainApi from '../../utils/MainApi';

function Register({ setLoginStatus }) {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const { setUserInfo } = useCurrentUserContext();
  const [errorText, setErrorText] = useState('');

  function handleUserRegistration(event) {
    event.preventDefault();

    if (isValid) {
      mainApi
        .signup(values.name, values.email, values.password)
        .then(() => {
          return mainApi.signin(values.email, values.password);
        })
        .then((data) => {
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
        <main className='register'>
          <h1 className='register__title'>Добро пожаловать!</h1>
          <form
            className='register__form'
            onSubmit={handleUserRegistration}
            noValidate
          >
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
                value={values.name || ''}
                onChange={handleChange}
              />
              {errors.name && (
                <span className='register__input-error'>{errors.name}</span>
              )}
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
                value={values.email || ''}
                onChange={handleChange}
              />
              {errors.email && (
                <span className='register__input-error'>{errors.email}</span>
              )}
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
                value={values.password || ''}
                onChange={handleChange}
              />
              {errors.password && (
                <span className='register__input-error'>{errors.password}</span>
              )}
            </label>
            <button
              className={`register__button ${
                !isValid ? '' : 'register__button_enabled'
              }`}
              type='submit'
              disabled={!isValid}
            >
              Зарегистрироваться
            </button>
            <p className='register__text'>
              Уже зарегистрированы? &nbsp;
              <Link to='/signin' className='register__link'>
                Войти
              </Link>
            </p>
            {errorText && (
              <span className='register__input-error register__input-error_type_server'>
                {errorText}
              </span>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}

export default Register;
