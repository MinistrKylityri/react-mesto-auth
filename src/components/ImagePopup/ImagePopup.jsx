export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section
      className={`popup popup_img ${isOpen && "popup_open"}`}
      onClick={onClose}
    >
      <figure
        className="popup__content-img"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button type="button" className="popup__close" onClick={onClose} />
        <img
          className="popup__element-img"
          name="link"
          src={card.link}
          alt={card.name}
        />
        <figure className="popup__title-img" name="title">
          {card.name}
        </figure>
      </figure>
    </section>
  );
}
