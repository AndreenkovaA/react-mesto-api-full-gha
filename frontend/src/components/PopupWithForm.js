import React from 'react';

function PopupWithForm(props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button className={`popup__button-close popup__button-close_type_${props.name}`} type="button" onClick={props.onClose} />
        <form className={`form form_type_${props.name}`} name="myProfile" method="post" onSubmit={props.onSubmit}>
          <h2 className="form__heading">{props.title}</h2>
          {props.children}
          <button className="form__button-submit" type="submit">{props.button}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;