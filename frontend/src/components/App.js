import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import api from './../utils/api.js';
import Register from './Register';
import Login from './Login';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from "./ProtectedRoute";
import { CurrentUserContext } from './../contexts/CurrentUserContext';
import { register, authorize, getContent } from '../utils/Auth.js';


function App() {
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ]  = useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [ selectedCard, setSelectedCard ] = useState({});
  const [ cardForDelete, setCardForDelete ] = useState({});
  const [ currentUser, setCurrentUser ] = useState({});
  const [ userEmail, setUserEmail ] = useState({});
  const [ cards, setCards ] = useState([]);
  const [ loggedIn, setLoggedIn ] = useState(!!localStorage.getItem('token'));
  const [ isInfoTooltipOpen, setIsInfoTooltipOpen ] = useState(false);
  const [ tooltipData, setTooltipData ] = useState({});
  const [ loginValue, setLoginValue] = useState({
    email: '',
    password: ''
  });
  const [registerValue, setRegisterValue] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn]);

  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      api.getInitData()
      .then(([initialCards, userData]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
      getContent(token)
      .then((res) => {
        if (res){
          setUserEmail({ email: res.data.email })
          setLoggedIn(true);
          navigate("/", {replace: true})
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleButtonLoginClick() {
    setIsInfoTooltipOpen(true);
    setTooltipData({name: "refusal", title: "Что-то пошло не так! Попробуйте ещё раз."})
  }

  function handleRegister() {
    register(registerValue.password, registerValue.email)
      .then((res) => {
        setIsInfoTooltipOpen(true);
        setTooltipData({
          name: "acceptable",
          title: "Вы успешно зарегистрировались!",
        });
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => handleButtonLoginClick(err));
  }

  function handleLogin() {
    authorize(loginValue.email, loginValue.password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoginValue({ username: '', password: '' });
          setUserEmail({ email: loginValue.email });
          setLoggedIn(true);
          navigate('/');
        }
      })
      .catch(() => handleButtonLoginClick());
  }

  function signOut() {
    if (loggedIn) {
      localStorage.removeItem('token');
      setLoggedIn(false);
      navigate('/sign-in');
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
    setCardForDelete({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.likeCard(card._id, isLiked
    ).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
  });
  }

  function handleCardDelete(e) {
    e.preventDefault();
    api.deleteCard(cardForDelete._id).then((res) => {
      setCards((state) => state.filter((c) => c._id !== cardForDelete._id));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
  });
  }

  function handleUpdateUser(userData) {
    api.editProfile(userData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
    });
  }

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
    });
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
    });
  }

  return (
    <>
      
      <Routes>
        <Route path="/sign-up" element={
          <>
            <Header route="/sign-in" link="Войти"/>
            <Register onRegister={handleRegister} formValue={ registerValue } setFormValue={ setRegisterValue }/>
          </>
        }
        />
        <Route path="/sign-in" element={
          <>
            <Header route="/sign-up" link="Регистрация"/>
            <Login onLogin={ handleLogin } formValue={ loginValue } setFormValue={ setLoginValue }/>
          </>
        }
        />
        <Route path="/" element={
          <ProtectedRouteElement
            loggedIn={loggedIn}
          >
            <CurrentUserContext.Provider value={{ currentUser }}>
              <Header link="Выйти" userEmail={userEmail} signOut={signOut} />
              <Main
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                handleCardDelete={setCardForDelete}
              />
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddCard={handleAddPlaceSubmit}
              />
              <PopupWithForm
                isOpen={Object.keys(cardForDelete).length > 0}
                onSubmit={handleCardDelete} onClose={closeAllPopups}
                name="card-delete" title="Вы уверены?" button="Да"
              />
              {Object.keys(selectedCard).length > 0 && <ImagePopup card={selectedCard} onClose={closeAllPopups}/>}
            </CurrentUserContext.Provider>
          </ProtectedRouteElement>
        }
        />
      </Routes>
      <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              tooltipData={tooltipData}
            />
      <Footer />
    </>
  );
}


export default App;
