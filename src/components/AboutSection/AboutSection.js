import PropTypes from 'prop-types';
import './AboutSection.css';

function AboutSection({ children, title, id }) {
  return (
    <section className="about app__section" id={id}>
      <h2 className="about__title">{title}</h2>
      {children}
    </section>
  );
}

AboutSection.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired
}

export default AboutSection;
