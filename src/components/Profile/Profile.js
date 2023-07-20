import './Profile.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header/Header.js';

function Profile() {
  const [isFormEditing, setIsFormEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleMakeEditable() {
    setIsFormEditing(!isFormEditing);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  return (
    <body className='body'>
      <Header color={{ pink: false }} loggedIn={true} />
      <main className='profile'>
        <div className='profile__top'>
          <h1 className='profile__title'>Привет, Даниил!</h1>
          <form className='profile__form'>
            <label className='profile__label'>
              <span className='profile__input-title'>Имя</span>
              <input
                disabled={!isFormEditing}
                className='profile__input'
                name='name'
                type='text'
                id='profile-input-name'
                value={name}
                onChange={handleNameChange}
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
                value={email}
                onChange={handleEmailChange}
                required
                placeholder='Введите e-mail'
              />
            </label>
          </form>
        </div>
        <div className='profile__bottom'>
          {isFormEditing ? (
            <button
              type='submit'
              className='profile__button profile__button_type_submit'
              onClick={handleMakeEditable}
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
              <Link to='/signin' className='profile__link'>
                <button
                  className='profile__button profile__button_type_exit'
                  type='button'
                >
                  Выйти из аккаунта
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </body>
  );
}

export default Profile;
