import PopupWithForm from "../PopupWithForm/PopupWithForm";
export default function DeletePopup({ isOpen, onClose, onDeleteCard }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      name="delete-confirm"
      title="Вы уверены?"
      titleButton="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
