function Portfolio() {
  return (
    <section className='portfolio'>
      <span className='portfolio__title'>Портфолио</span>
      <ul className='portfolio__list'>
        <li className='portfolio__li'>
          <a
            className='portfolio__link'
            href='https://github.com/Nasdermn/how-to-learn'
            rel='noopener noreferrer'
            target='_blank'
          >
            Статичный сайт
          </a>
        </li>
        <li className='portfolio__li'>
          <a
            className='portfolio__link'
            href='https://github.com/Nasdermn/russian-travel'
            rel='noopener noreferrer'
            target='_blank'
          >
            Адаптивный сайт
          </a>
        </li>
        <li className='portfolio__li'>
          <a
            className='portfolio__link'
            href='https://github.com/Nasdermn/react-mesto-auth'
            rel='noopener noreferrer'
            target='_blank'
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
