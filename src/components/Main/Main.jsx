import { useContext } from "react";

import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDelete,
  cards,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__card">
          <button
            type="button"
            className="profile__avatar-button"
            onClick={onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar ? currentUser.avatar : "#"}
              alt="Аватар"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">
              {currentUser.name ? currentUser.name : ""}
            </h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            />
            <p className="profile__job">
              {currentUser.about ? currentUser.about : ""}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section id="elements" className="elements">
        {cards.map((data) => {
          return (
            <div key={data._id}>
              <Card
                card={data}
                onCardClick={onCardClick}
                onDelete={onDelete}
                onCardLike={onCardLike}
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}
