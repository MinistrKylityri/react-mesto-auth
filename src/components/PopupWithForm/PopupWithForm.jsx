export default function PopupWithForm({
  name,
  title,
  titleButton,
  children,
  isOpen,
  onClose,
  onSubmit,
  isValid = true,
}) {
  return (
    <section
      className={`popup popup_${name} ${isOpen && "popup_open"}`}
      onClick={onClose}
    >
      <div className="popup__content" onClick={(evt) => evt.stopPropagation()}>
        <div role="button" className="popup__close" onClick={onClose} />
        <h2
          className={`popup__title ${
            name === "delete-confirm" ? "popup__title_delete" : ""
          }`}
        >
          {title}
        </h2>
        <form
          id="form_edit"
          className="popup__form popup__form_edit"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            type="submit"
            className={`popup__submit ${
              isValid ? "" : "popup__submit_disabled"
            }`}
            disabled={!isValid}
          >
            {titleButton || "Сохранить"}
          </button>
        </form>
      </div>
    </section>
  );
}
