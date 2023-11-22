import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
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
    setValue("name", currentUser.name);
    setValue("job", currentUser.about);
  }, [currentUser, isOpen, setValue]);

  function resetForClose() {
    onClose();
    reset({ name: currentUser.name, job: currentUser.about });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name: values.name, job: values.job }, reset);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      titleButton="Сохранить"
      isOpen={isOpen}
      onClose={resetForClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        id="name"
        className={`popup__input popup__input_type_name ${
          isInputValid.name === undefined || isInputValid.name
            ? ""
            : "popup__input_invalid"
        }`}
        name="name"
        placeholder="Ваше имя"
        required
        minLength={2}
        maxLength={40}
        autoComplete="off"
        value={values.name ? values.name : ""}
        onChange={handleChange}
      />
      <span id="error-name" className="error-message">
        {errors.name}
      </span>
      <input
        name="job"
        className={`popup__input popup__input_type_job ${
          isInputValid.job === undefined || isInputValid.job
            ? ""
            : "popup__input_invalid"
        }`}
        placeholder="Ваша профессия"
        required
        minLength={2}
        maxLength={200}
        id="job"
        autoComplete="off"
        value={values.job ? values.job : ""}
        onChange={handleChange}
      />
      <span id="error-job" className="error-message">
        {errors.job}
      </span>
    </PopupWithForm>
  );
}
