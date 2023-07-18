import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from './../contexts/CurrentUserContext';

function Main(props) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar}>
          <img className="profile__avatar-img" src={ currentUser.avatar } alt="аватар пользователя"/>
          <div className="profile__avatar-edit"></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{ currentUser.name }</h1>
          <button onClick={props.onEditProfile} className="profile__button-edit" type="button" />
          <p className="profile__text">{ currentUser.about }</p>
        </div>
        <button onClick={props.onAddPlace} className="profile__button-add" type="button" />
      </section>
      {
        !!props.cards &&
        <section className="elements">
          {
            props.cards.map((item) => (
              <Card card={item} key={item._id} onCardClick={ props.onCardClick } onCardLike={ props.onCardLike } handleDeleteClick={props.handleCardDelete} />
            ))
          }
        </section>
      }
    </main>
  );
}

export default Main;
