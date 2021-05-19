import React from 'react';
import Button from '../Button/Button.jsx';
import cx from 'classnames';
import './Popup.css';

function Popup(props) {
  const { id, children, isActive, className, onClose }=props;

  const handlePopupOverlayMouseDown=(evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <section
      className={cx('popup', { 'popup_active': isActive })}
      id={ id }
      onMouseDown={handlePopupOverlayMouseDown}
    >
      <div className={cx(className, 'popup__view')}>
        <Button
          className="popup__close-button"
          onClick={onClose}
        />
        {children}
      </div>
    </section>
  );
}

export default Popup;