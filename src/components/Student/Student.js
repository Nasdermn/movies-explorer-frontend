import './Student.css';
import me from '../../images/me.jpg';

function Student() {
  return (
    <section className='student'>
      <h2 className='student__title'>Студент</h2>
      <div className='student__profile'>
        <div className='student__about'>
          <div className='student__card'>
            <h3 className='student__name'>Даниил</h3>
            <p className='student__subtitle'>Фронтенд-разработчик, 23 года</p>
            <p className='student__description'>
              Привет, ты находишься на странице моего дипломного проекта,
              сделанного на курсе Яндекс.Практикума "Веб-разработчик". Данная
              страница отражает мои актуальные навыки в области веб-разработки
              на момент лета 2023 года. Я планирую искать работу в данной сфере,
              когда закончу бакалавриат (учиться осталось 1 год). За это время я
              также планирую закрепить свои знания в веб-разработке.
            </p>
          </div>
          <a
            className='student__github'
            href='https://github.com/Nasdermn'
            target='_blank'
            rel='noopener noreferrer'
          >
            Github
          </a>
        </div>
        <img
          className='student__photo'
          alt='Аватарка автора проекта'
          src={me}
        ></img>
      </div>
    </section>
  );
}

export default Student;
