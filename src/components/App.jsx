import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvataPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import authApi from "../utils/apiAuth.js";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import success from "../images/Okay.svg";
import failure from "../images/Fail.svg";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import DeletePopup from "./DeletePopup/DeletePopup.jsx";

function App() {
  // Steiti Popup
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setImagePopup] = useState(false);
  const [isDeletePopup, setDeletePopupOpen] = useState(false);
  const [infoTooltipMessage, setinfoTooltipMessage] = useState({
    path: "",
    text: "",
  });
  const [isInfoPopup, setInfoPopupOpen] = useState(false);

  // State konteksta
  const [currentUser, setCurrentUser] = useState({});

  // Стейты карточки
  const [cards, setCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState("");

  //стейты состояния
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  const setAllStartesForClosePopup = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopup(false);
    setDeletePopupOpen(false);
    setInfoPopupOpen(false);
  }, []);

  const closePopupByEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        setAllStartesForClosePopup();
        document.removeEventListener("keydown", closePopupByEsc);
      }
    },
    [setAllStartesForClosePopup]
  );

  const closeAllPopup = useCallback(() => {
    setAllStartesForClosePopup();
    document.removeEventListener("keydown", closePopupByEsc);
  }, [setAllStartesForClosePopup, closePopupByEsc]);

  function setClosePopupByEscListener() {
    document.addEventListener("keydown", closePopupByEsc);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setClosePopupByEscListener();
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setClosePopupByEscListener();
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setClosePopupByEscListener();
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
    setClosePopupByEscListener();
  }
  function handleDeletePopupClick(cardId) {
    setDeleteCardId(cardId);
    setDeletePopupOpen(true);
    setClosePopupByEscListener();
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleRegister(email, password) {
    authApi
      .signUp({ email, password })
      .then((res) => {
        setinfoTooltipMessage({
          path: success,
          text: "Вы успешно зарегистрировались!",
        });
        navigate("/sign-in");
      })
      .catch(() =>
        setinfoTooltipMessage({
          path: failure,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        })
      )
      .finally(() => {
        setInfoPopupOpen(true);
      });
  }

  function handleLogin(email, password) {
    authApi
      .signIn({ email, password })
      .then((data) => {
        if (data.token) {
          setUserEmail(email);
          setIsLoggedIn(true);
          localStorage.setItem("JWT", data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSingOut() {
    localStorage.removeItem("JWT");
    setIsLoggedIn(false);
  }

  useEffect(() => {
    async function checkUserAuth() {
      try {
        const res = await authApi.checkToken(localStorage.getItem("JWT"));
        if (res.data) {
          setUserEmail(res.data.email);
          navigate("/");
          setIsLoggedIn(true);
        }
      } catch (error) {
        navigate("/sign-in");
        setIsLoggedIn(false);
        console.log(error);
      }
    }
    checkUserAuth();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getInfo(), api.getCards()])
        .then(([dataUser, dataCard]) => {
          setCurrentUser(dataUser);
          setCards(dataCard);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn]);

  function handleDeleteSubmit() {
    api
      .deleteCard(deleteCardId)
      .then((res) => {
        console.log(res);

        setCards((card) => card.filter((card) => card._id !== deleteCardId));
        closeAllPopup();
      })
      .catch((err) => console.error(`Ошибка удаления карточки ${err}`));
  }

  function handleUpdateUser(dataUser, reset) {
    api
      .setUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
        reset();
      })
      .catch((err) => console.error(`Ошибка редактирования профиля ${err}`));
  }

  function handleUpdateAvatar(dataUser, reset) {
    api
      .setNewAvatar(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
        reset();
      })
      .catch((err) => console.error(`Ошибка редактирования аватара ${err}`));
  }

  function handleAddPlaceSubmit(dataCard, reset) {
    api
      .addCard(dataCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopup();
        reset();
      })
      .catch((err) => console.error(`Ошибка добавления карточки ${err}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userEmail} onSignOut={handleSingOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onDelete={handleDeletePopupClick}
                onCardLike={handleCardLike}
                cards={cards}
                isLoggedIn={isLoggedIn}
              />
            }
          />

          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
          />

          <Route
            path="/sign-up"
            element={
              <Register onRegister={handleRegister} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path="/*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>

        <Footer />

        <InfoTooltip
          isOpen={isInfoPopup}
          onClose={closeAllPopup}
          title={infoTooltipMessage.text}
          path={infoTooltipMessage.path}
        />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvataPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
        />

        <DeletePopup
          isOpen={isDeletePopup}
          onClose={closeAllPopup}
          onDeleteCard={handleDeleteSubmit}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
