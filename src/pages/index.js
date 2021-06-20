import '../pages/index.css'; // добавьте импорт главного файла стилей 

import {
  popupEditProfileForm,
  popupAddCardForm,
  popupEditProfileTitle,
  popupEditProfileDescription,
  profileEditButton,
  profileAddButton,
  initialCards,
  config
} from '../utils/constats.js';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


const popupWithImage = new PopupWithImage('.popup_type_card', '.popup__image', '.popup__card-title');
popupWithImage.setEventListeners();

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
      const cardElement = createCard(cardItem.name, cardItem.link);
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
    userInfo.setUserInfo(data['edit-form-name'], data['edit-form-description']);
    popupUserInfo.close();
  }
});
popupUserInfo.setEventListeners();

const popupCardInfo = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (data) => {
    const cardElement = createCard(data['edit-form-name'], data['edit-form-description']);
    section.addItem(cardElement);
    popupCardInfo.close();
  }
});
popupCardInfo.setEventListeners();

profileEditButton.addEventListener('click', function () {

  popupUserInfo.open();
  const data = userInfo.getUserInfo();
  popupEditProfileTitle.value = data.userName;
  popupEditProfileDescription.value = data.userInfo;
});

profileAddButton.addEventListener('click', function () {
  popupCardInfo.open();

})