import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Header({ color, loggedIn }) {
  const { pathname } = useLocation();
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);

  function handleToggleMenu() {
    setIsHeaderMenuOpen(!isHeaderMenuOpen);
  }
  if (!loggedIn && !color.pink) {
    return (
      <header className='header header_empty'>
        <Link to='/' className='header__logo'></Link>
      </header>
    );
  } else {
    return (
      <header
        className={`header header_not_empty ${
          color.pink ? 'header_place_landing' : ''
        }`}
      >
        <Link to='/' className='header__logo'></Link>
        {loggedIn ? (
          <div className='header__nav'>
            <div className='header__navblock header__navblock_films'>
              <Link
                to='/movies'
                className={`header__link ${
                  pathname === '/movies' ? 'header__link_active' : ''
                }`}
              >
                Фильмы
              </Link>
              <Link
                to='/saved-movies'
                className={`header__link ${
                  pathname === '/saved-movies' ? 'header__link_active' : ''
                }`}
              >
                Сохраненные фильмы
              </Link>
            </div>
            <Link to='/profile' className='header__link header__link_account'>
              Аккаунт
            </Link>
            <button
              className='header__button'
              onClick={handleToggleMenu}
            ></button>
            <div
              className={`header__menu ${
                isHeaderMenuOpen ? 'header__menu_opened' : ''
              }`}
            >
              <div className='header__menu-container'>
                <button
                  className='header__menu-closer'
                  onClick={handleToggleMenu}
                ></button>
                <div className='header__menu-nav'>
                  <Link
                    to='/'
                    className={`header__menu-link ${
                      pathname === '/' ? 'header__menu-link_active' : ''
                    }`}
                  >
                    Главная
                  </Link>
                  <Link
                    to='/movies'
                    className={`header__menu-link ${
                      pathname === '/movies' ? 'header__menu-link_active' : ''
                    }`}
                  >
                    Фильмы
                  </Link>
                  <Link
                    to='/saved-movies'
                    className={`header__menu-link ${
                      pathname === '/saved-movies'
                        ? 'header__menu-link_active'
                        : ''
                    }`}
                  >
                    Сохранённые фильмы
                  </Link>
                </div>
                <Link to='/profile' className='header__menu-account'>
                  Аккаунт
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className='header__navblock'>
            <Link to='/signup' className='header__signup'>
              Регистрация
            </Link>
            <Link to='/signin' className='header__signin'>
              Войти
            </Link>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
