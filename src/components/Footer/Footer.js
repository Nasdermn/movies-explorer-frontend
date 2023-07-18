function Footer() {
  return (
    <footer className='footer'>
      <h2 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className='footer__content'>
        <span className='footer__copyright'>© 2023</span>
        <ul className='footer__nav'>
          <li className='footer__li'>
            <a
              className='footer__link'
              href='https://practicum.yandex.ru/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__li'>
            <a
              className='footer__link'
              href='https://github.com/Nasdermn'
              target='_blank'
              rel='noopener noreferrer'
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
