import './Profile.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../Header/Header.js';
import { useCurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../Validation/Validation.js';
import mainApi from '../../utils/MainApi';

function Profile() {
  const { userInfo, setUserInfo, setLoggedIn } = useCurrentUserContext();
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name: userInfo.name,
    email: userInfo.email,
  });
  const [isFormEditing, setIsFormEditing] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Проверяем, есть ли разница между начальными данными и текущими данными в форме
    const isFormDirty =
      values.name !== userInfo.name || values.email !== userInfo.email;

    // Обновляем стейт, который будет указывать, можно ли отправлять форму
    setIsFormChanged(isFormDirty);
  }, [values, userInfo]);

  function handleUserChange(event) {
    event.preventDefault();
    if (isValid) {
      mainApi
        .patchProfile(values.name, values.email)
        .then((updatedData) => {
          setUserInfo(updatedData);
          handleMakeEditable();
          setIsDataChanged(true);

          setTimeout(() => {
            setIsDataChanged(false);
          }, 900);
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
          setTimeout(() => {
            setError(false);
          }, 3000);
        });
    }
  }

  function handleMakeEditable() {
    setIsFormEditing(!isFormEditing);
    // При переключении в режим редактирования сбросим флаг изменений формы
    setIsFormChanged(false);
  }

  function handleUserLogout() {
    localStorage.clear();
    setUserInfo({ name: '', email: '' });
    setLoggedIn(false);
  }

  return (
    <div className='body'>
      <Header color={{ pink: false }} loggedIn={true} />
      <main className='profile'>
        <div className='profile__top'>
          <h1 className='profile__title'>Привет, {userInfo.name}!</h1>
          <form
            className='profile__form'
            onSubmit={handleUserChange}
            id='profile__form'
          >
            <label className='profile__label'>
              <span className='profile__input-title'>Имя</span>
              <input
                disabled={!isFormEditing}
                className='profile__input'
                name='name'
                type='text'
                id='profile-input-name'
                value={values.name || ''}
                onChange={handleChange}
                required
                placeholder='Введите имя'
                minLength={2}
                maxLength={30}
              />
            </label>
            <label className='profile__label'>
              <span className='profile__input-title'>E-mail</span>
              <input
                disabled={!isFormEditing}
                className='profile__input'
                name='email'
                type='email'
                id='profile-input-email'
                value={values.email || ''}
                onChange={handleChange}
                required
                placeholder='Введите e-mail'
              />
            </label>
            {isDataChanged && (
              <p className='profile__success-message'>Успешная смена данных!</p>
            )}
            {error && (
              <p className='profile__error-message'>
                Данный email уже кем-то используется, выберите другой.
              </p>
            )}
          </form>
        </div>
        <div className='profile__bottom'>
          {errors.name && (
            <span className='profile__input-error'>{errors.name}</span>
          )}
          {errors.email && (
            <span className='profile__input-error'>{errors.email}</span>
          )}
          {isFormEditing ? (
            <button
              type='submit'
              form='profile__form'
              className={`profile__button profile__button_type_submit ${
                isValid && isFormChanged
                  ? 'profile__button_type_submit_enabled'
                  : ''
              }`}
              disabled={!isValid || !isFormChanged}
            >
              Сохранить
            </button>
          ) : (
            <div className='profile__buttons'>
              <button
                className='profile__button profile__button_type_change'
                type='button'
                form='profile__form'
                disabled={false}
                onClick={handleMakeEditable}
              >
                Редактировать
              </button>
              <Link to='/' className='profile__link'>
                <button
                  className='profile__button profile__button_type_exit'
                  type='button'
                  onClick={handleUserLogout}
                >
                  Выйти из аккаунта
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Profile;
