import React from 'react';

function ImagePopup(props) {
 
  return (
    <div className='popup popup_type_photo popup_opened'>
      <div className="popup__container popup__container_type_photo">
        <button className="popup__button-close popup__button-close_type_photo" type="button" onClick={props.onClose}></button>
        <figure className="container">
          <img className="container__img" src={props.card?.link} alt={props.card?.name}/>
          <figcaption className="container__caption">{props.card?.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;