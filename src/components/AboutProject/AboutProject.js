import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <div className="project">
      <div className="project__about">
        <article className="project__info">
          <h3 className="project__title">Дипломный проект включал 5 этапов</h3>
          <p className="project__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className="project__info">
          <h3 className="project__title">На выполнение диплома ушло 5 недель</h3>
          <p className="project__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>

      <div className="project__schedule">
        <article className="project__stage project__stage_type_backend">
          <div className="project__deadline project__deadline_passed">1 неделя</div>
          <h3 className="project__stage-name">Back-end</h3>
        </article>
        <article className="project__stage project__stage_type_frontend">
          <div className="project__deadline">4 недели</div>
          <h3 className="project__stage-name">Front-end</h3>
        </article>
      </div>
    </div>
  );
}

export default AboutProject;
