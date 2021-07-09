import '../pages/index.css'; // добавьте импорт главного файла стилей 

import {
  popupEditProfileForm,
  popupAddCardForm,
  popupEditProfileTitle,
  popupEditProfileDescription,
  profileEditButton,
  profileAddButton,
  initialCards,
  config,
  options
} from '../utils/constats.js';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithButton from '../components/PopupWithButton.js';


const api = new Api(options);
api.getUserInfo();

const popupWithImage = new PopupWithImage('.popup_type_card', '.popup__image', '.popup__card-title');
popupWithImage.setEventListeners();

const popupDelete = new PopupWithButton('.popup_type_delete');
popupDelete.setEventListeners();

function createCard(title, imageLink, likes) {
  const card = new Card(title, imageLink, likes, '#element', {
    handleCardClick: (title, imageLink) => {
      popupWithImage.open(title, imageLink);
    },
    handleCardTrash: () => {
      popupDelete.open();
    }
  });
  const cardElement = card.generateCard();

  return cardElement;
}

const section = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem.name, cardItem.link, cardItem.likes.length);
      section.addItem(cardElement);
    }
  }, '.elements', options);

section.rendererItems();

const editProfileFormValidator = new FormValidator(config, popupEditProfileForm);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, popupAddCardForm);
addCardFormValidator.enableValidation();

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
  // getUserInfoApi: () => {
  //   api.getUserInfo()
  //     .then(initData => {
  //       const data = {
  //         userName: initData.name,
  //         userInfo: initData.about
  //       }
  //       return data;
  //     })
  // }
}, options);

userInfo.getUserInfo()
  .then(data => {
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setAvatar(data.avatar);
  })

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

    section.addCard(data['edit-form-name'], data['edit-form-description'])
      .then(() => {
        const cardElement = createCard(data['edit-form-name'], data['edit-form-description'], 0);
        section.addItem(cardElement);
        popupCardInfo.close();
      })
  }
});
popupCardInfo.setEventListeners();

profileEditButton.addEventListener('click', function () {

  popupUserInfo.open();
  userInfo.getUserInfo()
    .then(data => {
      popupEditProfileTitle.value = data.name;
      popupEditProfileDescription.value = data.about;
    })
});

profileAddButton.addEventListener('click', function () {
  popupCardInfo.open();

});