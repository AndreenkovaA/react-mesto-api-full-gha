import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const cardLink = useRef();
  const cardTitle = useRef();
  
  useEffect(() => {
    cardLink.current.value = "";
    cardTitle.current.value = "";
  }, [props.isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onAddCard({
      name: cardTitle.current.value,
      link: cardLink.current.value,
    });
  }  

  return (
    <PopupWithForm name="card" title="Новое место" isOpen={ props.isOpen } onClose={ props.onClose } onSubmit={ handleSubmit } button="Создать">
      <input type="text" className="form__item form__item_name" name="name" ref={cardTitle } id="cardname" placeholder="Название" minLength = "2" maxLength = "30" required />
      <span className="form__item-error cardname-error"></span>
      <input type="url" className="form__item form__item_link" name="link" ref={cardLink} id="link" placeholder="Ссылка на картинку" required />
      <span className="form__item-error link-error"></span>
    </PopupWithForm>
  );
  
}

export default AddPlacePopup;