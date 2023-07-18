import React, { useContext } from 'react';
import { CurrentUserContext } from './../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, handleDeleteClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `elements__heart ${isLiked && 'elements__heart_active'}` 
  );

  function handleClick() {
    onCardClick(card);
  }

  function onCardDelete(e) {
    e.stopPropagation();
    handleDeleteClick(card);
  }

  return (
    <div className="elements__element"> 
      <div className="elements__photo" style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick}>
        {isOwn && <button className="elements__button-delete" onClick={ onCardDelete } type="button" />}
      </div>
      <div className="elements__group"> 
        <h2 className="elements__title">{ card.name }</h2>
        <div>
          <button className={cardLikeButtonClassName} type="button" onClick={ () => onCardLike(card, isLiked) } />
          {card.likes.length > 0 && <div className="elements__amount">{ card.likes.length }</div>}
        </div> 
      </div> 
    </div>
  );
}

export default Card;