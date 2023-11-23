import { useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const {
    values,
    errors,
    isValid,
    isInputValid,
    handleChange,
    reset,
    setValue,
  } = useFormValidation();

  function resetForClose() {
    onClose();
    reset();
  }

  useEffect(() => {
    setValue("title", reset);
    setValue("link", reset);
  }, [isOpen, setValue]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ title: values.title, link: values.link }, reset);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      titleButton="Создать"
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="title"
        className={`popup__input popup__input_type_title ${
          isInputValid.title === undefined || isInputValid.title
            ? ""
            : "popup__input_invalid"
        }`}
        name="title"
        placeholder="Название"
        required
        minLength={2}
        maxLength={30}
        autoComplete="off"
        value={values.title ? values.title : ""}
        onChange={handleChange}
      />
      <span id="error-title" className="error-message error-message_active">
        {errors.title}
      </span>
      <input
        id="link"
        className={`popup__input popup__input_type_link ${
          isInputValid.link === undefined || isInputValid.link
            ? ""
            : "popup__input_invalid"
        }`}
        name="link"
        placeholder="Ссылка на картинку"
        required
        type="url"
        value={values.link ? values.link : ""}
        onChange={handleChange}
      />
      <span id="error-link" className="error-message error-message_active">
        {errors.link}
      </span>
    </PopupWithForm>
  );
}
