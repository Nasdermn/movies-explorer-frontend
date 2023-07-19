import './Techs.css';

function Techs() {
  return (
    <section className='techs'>
      <h2 className='techs__title'>Технологии</h2>
      <p className='techs__heading'>7 технологий</p>
      <p className='techs__paragraph'>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className='techs__techlist'>
        <li className='techs__techblock'>HTML</li>
        <li className='techs__techblock'>CSS</li>
        <li className='techs__techblock'>JS</li>
        <li className='techs__techblock'>React</li>
        <li className='techs__techblock'>Git</li>
        <li className='techs__techblock'>Express.js</li>
        <li className='techs__techblock'>mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
