import '../pages/index.css'; // добавьте импорт главного файла стилей 

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');

const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');

const popupCard = document.querySelector('.popup_type_card');
const popupCardImage = popupCard.querySelector('.popup__image');
const popupCardTitle = popupCard.querySelector('.popup__card-title')

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const initialCards = [
  {
    name: 'Архыз',
    link: new URL('../images/arkhyz.jpg', import.meta.url)
  },
  {
    name: 'Челябинская область',
    link: new URL('../images/chelyabinsk-oblast.jpg', import.meta.url)
  },
  {
    name: 'Иваново',
    link: new URL('../images/ivanovo.jpg', import.meta.url)
  },
  {
    name: 'Камчатка',
    link: new URL('../images/kamchatka.jpg', import.meta.url)
  },
  {
    name: 'Холмогорский район',
    link: new URL('../images/kholmogorsky-rayon.jpg', import.meta.url)
  },
  {
    name: 'Байкал',
    link: new URL('../images/baikal.jpg', import.meta.url)
  }
]; 

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input-text_type_error',
  errorActiveClass: 'popup__input-error_active',
  submitButtonInactiveClass: 'popup__submit_inactive'
};

const popupWithImage = new PopupWithImage('.popup_type_card');
popupWithImage.setEventListeners()

function createCard(title, imageLink) {
  const card = new Card(title, imageLink, '#element', {
    handleCardClick: (title, imageLink) => {
      popupWithImage.open(title, imageLink);
    }
  });
  const cardElement = card.generateCard();

  return cardElement;
}

const section = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem.name, cardItem.link, '#element', {
        handleCardClick: (title, imageLink) => {
          popupWithImage.open(title, imageLink);
        }
      });
      const cardElement = card.generateCard();
      section.addItem(cardElement);
    }
  }, '.elements');

section.rendererItems();

const editProfileFormValidator = new FormValidator(config, popupEditProfileForm);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, popupAddCardForm);
addCardFormValidator.enableValidation();

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__description'
});

const popupUserInfo = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo()
    profileName.textContent = data.inputTitleData;
    profileDescription.textContent = data.inputDescriptionData;
    popupUserInfo.close();
  }
});
popupUserInfo.setEventListeners();

const popupCardInfo = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (data) => {
    const cardElement = createCard(data.inputTitleData, data.inputDescriptionData);
    section.addItem(cardElement);
    popupCardInfo.close();
  }
});
popupCardInfo.setEventListeners();

profileEditButton.addEventListener('click', function () {

  popupUserInfo.open();
  const data = userInfo.getUserInfo();
  popupUserInfo.setInputValues(data.userName, data.userInfo);

});

profileAddButton.addEventListener('click', function () {
  popupCardInfo.open();

})