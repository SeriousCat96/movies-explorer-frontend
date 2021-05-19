import React from 'react';
import Popup from '../Popup/Popup.jsx';
import './InfoPopup.css';

function InfoPopup({isActive, image, title, onClose}) {

  return (
    <Popup
      id="info-popup"
      isActive={isActive}
      onClose={onClose}
      className="info-popup"
    >
      <div className="info-popup__container">
        <img className="info-popup__image" alt={`Изображение "${title}"`} src={image} />
        <h2 className="info-popup__title">{title}</h2>
      </div>
    </Popup>
  );
}

export default InfoPopup;