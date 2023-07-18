import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarLink = useRef(); 
  
  useEffect(() => {
    avatarLink.current.value = "";
  }, [props.isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarLink.current.value
    });
  } 

  return (
    <PopupWithForm name="avatar-change" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={ handleSubmit } button="Сохранить">
      <input type="url" className="form__item form__item_link" name="avatar" ref={ avatarLink } id="avatar" placeholder="Ссылка на картинку" required />
      <span className="form__item-error avatar-error"></span>
    </PopupWithForm>
  );
  
}

export default EditAvatarPopup;