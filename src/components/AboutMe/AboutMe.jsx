import React from 'react';
import photo from '../../images/photo.jpg'
import Navigation from '../Navigation/Navigation.jsx';
import { Link } from '../Link/Link.jsx';
import './AboutMe.css';

function AboutMe() {
  return (
    <div className="about-me">
      <article className="about-me__info">
        <h3 className="about-me__title">Павел</h3>
        <p className="about-me__subtitle">
          Fullstack-разработчик, 25 лет
        </p>
        <p className="about-me__text">
          Я родился и живу в Череповце, закончил Институт Информационных Технологий ЧГУ.
          Служил в армии по призыву в научной роте. Женат. Начал кодить в 2014 году.
          С 2017 года работал в компании "ООО Малленом Системс" в должности "Разработчик C#".
          После прохождения курса по веб-разработке переквалифицировался как Fullstack-разработчик.
        </p>

        <Navigation itemsClassName="about-me__nav">
          <Link to="https://vk.com/serious_cat" className="about-me__link">ВКонтакте</Link>
          <Link to="https://github.com/SeriousCat96" className="about-me__link">Github</Link>
        </Navigation>
      </article>
      <img className="about-me__photo" src={photo} alt="Фото" />
    </div>
  );
}

export default AboutMe;
