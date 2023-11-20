export default function InfoTooltip({ isOpen, onClose, title, path }) {
  return (
    <section className={`popup ${isOpen && "popup_open"}`}>
      <div className="popup__content popup__content_auth">
        <img src={path} alt={path} className="popup__auth-img" />
        <h2 className="popup__title popup__title_auth">{title}</h2>
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </div>
    </section>
  );
}
