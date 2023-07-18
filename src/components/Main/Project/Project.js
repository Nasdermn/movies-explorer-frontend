function Project() {
  return (
    <section className='project'>
      <h2 className='project__title'>О проекте</h2>
      <div className='project__description'>
        <div className='project__description-block'>
          <h3 className='project__headline'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='project__paragraph'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='project__description-block'>
          <h3 className='project__headline'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='project__paragraph'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='project__deadlines'>
        <p className='project__deadline'>1 неделя</p>
        <p className='project__deadline project__deadline_gray'>4 недели</p>
        <p className='project__step'>Back-end</p>
        <p className='project__step'>Front-end</p>
      </div>
    </section>
  );
}

export default Project;
