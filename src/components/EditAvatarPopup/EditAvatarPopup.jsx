import { useEffect, useRef } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvataPopup({ isOpen, onClose, onUpdateAvatar }) {
  const input = useRef(0);
  const {
    values,
    errors,
    isValid,
    isInputValid,
    handleChange,
    reset,
    setValue,
  } = useFormValidation();

  useEffect(() => {
    setValue("avatar", reset);
  }, [isOpen, setValue]);

  function resetForClose() {
    onClose();
    reset();
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: input.current.value }, reset);
    console.log(input.current.value);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      titleButton="Сохранить"
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        ref={input}
        id="avatar"
        type="url"
        name="avatar"
        className={`popup__input popup__input_type_card-url ${
          isInputValid.avatar === undefined || isInputValid.avatar
            ? ""
            : "popup__input_invalid"
        }}`}
        required=""
        placeholder="Ссылка на картинку"
        value={values.avatar ? values.avatar : ""}
        onChange={handleChange}
      />
      <span id="error-avatar" className="error-message avatar-error">
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}
