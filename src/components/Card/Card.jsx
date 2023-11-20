import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__button ${
    isLiked && "element__button_active"
  }`;

  return (
    <article className="element">
      {isOwn && (
        <button
          type="button"
          className="element__delete"
          onClick={() => onDelete(card._id)}
        />
      )}
      <img
        className="element__img"
        src={card.link}
        alt={`Картинка ${card.name}`}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="element__description">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__card-like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)}
          />
          <span className="element__counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}
