import Promo from '../Promo/Promo.jsx';
import AboutSection from '../AboutSection/AboutSection.jsx';
import AboutProject from '../AboutProject/AboutProject.jsx';
import AboutMe from '../AboutMe/AboutMe.jsx';
import Techs from '../Techs/Techs.jsx';
import Portfolio from '../Portfolio/Portfolio.jsx';

const About = () => {
  return (
    <>
      <Promo />
      <AboutSection title="О проекте" id="about">
        <AboutProject />
      </AboutSection>
      <AboutSection title="Технологии" id="techs">
        <Techs />
      </AboutSection>
      <AboutSection title="Студент" id="student">
        <AboutMe />
      </AboutSection>
      <Portfolio />
    </>
  );
}

export default About;