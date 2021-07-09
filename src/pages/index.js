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

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithButton from '../components/PopupWithButton.js';



const popupWithImage = new PopupWithImage('.popup_type_card', '.popup__image', '.popup__card-title');
popupWithImage.setEventListeners();

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

const section = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      let isLiked = false;
      const userId = userInfo.getUserId();
      cardItem.likes.forEach(user => {
        if(user._id === userId) {
          isLiked = true;
        }
      })
      const cardElement = createCard(cardItem.name, cardItem.link, cardItem.likes.length, cardItem.owner, cardItem._id, isLiked);
      section.addItem(cardElement);
    }
  }, '.elements', options);

section.rendererItems();

const popupDelete = new PopupWithButton({
  popupSelector: '.popup_type_delete',
  formSelector: '.popup__form',
  handleFormSubmit: (cardId, card) => {
    popupDelete.close();
    section.removeCard(cardId, card);
  }
});
popupDelete.setEventListeners();

function createCard(title, imageLink, likes, owner, cardId, isLiked) {
  const card = new Card(title, imageLink, likes, owner._id, userInfo.getUserId(), cardId, isLiked, '#element', {
    handleCardClick: (title, imageLink) => {
      popupWithImage.open(title, imageLink);
    },
    handleCardTrash: (cardId) => {
      popupDelete.open(cardId, cardElement);
    },
    handleCardLike: (isLiked, cardId) => {
      if(isLiked) {
        return section.deslikeCard(cardId);
      }
      else {
        return section.likeCard(cardId)
      }
    }
  });
  const cardElement = card.generateCard();

  return cardElement;
}



const editProfileFormValidator = new FormValidator(config, popupEditProfileForm);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, popupAddCardForm);
addCardFormValidator.enableValidation();


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
      .then((res) => {
        const cardElement = createCard(data['edit-form-name'], data['edit-form-description'], 0, userInfo.getUserId(), res._id, false);
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