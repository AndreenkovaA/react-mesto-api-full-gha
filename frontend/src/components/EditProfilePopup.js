import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from './../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  function onNameChange(event) {
    setName(event.target.value);
  }

  function onDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} button="Сохранить">
      <input type="text" className="form__item" name="name" id="name" value={name || ''} onChange={onNameChange} placeholder="Имя" minLength="2" maxLength="40" required />
      <span className="form__item-error name-error"></span>
      <input type="text" className="form__item" name="about" id="about" value={description  || ''} onChange={onDescriptionChange} placeholder="О себе" minLength="2" maxLength="200" required />
      <span className="form__item-error about-error"></span>
    </PopupWithForm>
  );
  
}

export default EditProfilePopup;