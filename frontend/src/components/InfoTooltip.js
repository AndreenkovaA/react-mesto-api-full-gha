import React from 'react';

function InfoTooltip(props) {

  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__button-close" type="button" onClick={props.onClose} />
        <form className="form">
          <div className={`form__img form__img_type_${props.tooltipData.name}`}></div>
          <h2 className="form__heading form__heading_type_auth">{ props.tooltipData.title }</h2>
        </form>
      </div>
    </div>
  );
}

export default InfoTooltip;