import React from 'react';
import List from '../List/List.jsx';
import './Techs.css';

function Techs() {
  const items = [
    'HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mondoDB'
  ];

  return (
    <div className="techs">
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__subtitle">
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <List className="techs__grid">
        {
          items.map((item) => (
            <article key={item} className="techs__item">
              {item}
            </article>
          ))
        }
      </List>
    </div>
  );
}

export default Techs;
