import Header from '../Header/Header.js';
import Promo from '../Promo/Promo.js';
import Project from '../Project/Project.js';
import Techs from '../Techs/Techs.js';
import Student from '../Student/Student.js';
import Portfolio from '../Portfolio/Portfolio.js';
import Footer from '../Footer/Footer.js';

function Main() {
  return (
    <body className='body'>
      <Header color={{ pink: true }} loggedIn={false} />
      <main className='main'>
        <Promo />
        <Project />
        <Techs />
        <Student />
        <Portfolio />
      </main>
      <Footer />
    </body>
  );
}

export default Main;
