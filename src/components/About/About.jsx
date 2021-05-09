import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import Promo from '../Promo/Promo.jsx';
import AboutSection from '../AboutSection/AboutSection.jsx';
import AboutProject from '../AboutProject/AboutProject.jsx';
import AboutMe from '../AboutMe/AboutMe.jsx';
import Techs from '../Techs/Techs.jsx';
import Portfolio from '../Portfolio/Portfolio.jsx';

const About = () => {
  return (
    <>
      <Header/>
      <Main>
        <Promo />
        <AboutSection title="О проекте" id="about" name="aboutProject">
          <AboutProject />
        </AboutSection>
        <AboutSection title="Технологии" id="techs" name="aboutTechs">
          <Techs />
        </AboutSection>
        <AboutSection title="Студент" id="student" name="aboutStudent">
          <AboutMe />
        </AboutSection>
        <Portfolio />
      </Main>
      <Footer />
    </>
  );
}

export default About;