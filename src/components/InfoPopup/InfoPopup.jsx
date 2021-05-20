import React from 'react';
import Popup from '../Popup/Popup.jsx';
import cx from 'classnames';
import './InfoPopup.css';

function InfoPopup({isActive, success, title, onClose, autoCloseMs = 5000}) {

  React.useEffect(
    () => {
      const timerId = setTimeout(() => onClose(), autoCloseMs);

      return () => {
        clearTimeout(timerId);
      }
    }
  )

  return (
    <Popup
      id="info-popup"
      isActive={isActive}
      onClose={onClose}
      viewClassName={cx('info-popup', { 'info-popup_status_success': success, 'info-popup_status_error': !success })}
    >
      <div className="info-popup__container">
        <h2 className="info-popup__title">{title}</h2>
      </div>
    </Popup>
  );
}

export default InfoPopup;