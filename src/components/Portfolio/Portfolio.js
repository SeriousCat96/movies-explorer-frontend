import React from 'react';
import Link from '../Link/Link';
import Navigation from '../Navigation/Navigation';
import link from '../../images/link.svg';
import './Portfolio.css';

const PortfolioLink = ({ text }) => {
  return (
    <>
      <span>
        {text}
      </span>
      <img className="portfolio__link-image" src={link} alt="Изображение ссылки" />
    </>
  );
}

const Portfolio = () => {
  return (
    <section className="portfolio app__section">
      <h2 className="portfolio__title">Портфолио</h2>
      <Navigation className="portfolio__nav">
        <Link to="https://github.com/SeriousCat96/how-to-learn" className="portfolio__link">
          <PortfolioLink text="Статичный сайт"/>
        </Link>
        <Link to="https://github.com/SeriousCat96/russian-travel" className="portfolio__link">
          <PortfolioLink text="Адаптивный сайт"/>
        </Link>
        <Link to="https://github.com/SeriousCat96/react-mesto-api-full" className="portfolio__link">
          <PortfolioLink text="Одностраничное приложение"/>
        </Link>
      </Navigation>
    </section>
  );
}

export default Portfolio;
