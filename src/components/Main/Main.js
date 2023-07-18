import Header from '../Header/Header.js';
import Promo from './Promo/Promo.js';
import Project from './Project/Project.js';
import Techs from './Techs/Techs.js';
import Student from './Student/Student.js';
import Portfolio from './Portfolio/Portfolio.js';
import Footer from '../Footer/Footer.js';

function Main() {
  return (
    <div className='body'>
      <Header color={{ pink: true }} loggedIn={false} />
      <Promo />
      <Project />
      <Techs />
      <Student />
      <Portfolio />
      <Footer />
    </div>
  );
}

export default Main;
