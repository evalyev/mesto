import '../pages/index.css'; // добавьте импорт главного файла стилей 

import {
  popupEditProfileForm,
  popupAddCardForm,
  popupEditProfileTitle,
  popupEditProfileDescription,
  profileEditButton,
  popupEditCardBtn,
  popupAddCardBtn,
  profileAddButton,
  profileEditAvatar,
  popupEditAvatar,
  popupEditAvatarBtn,
  popupEditAvatarForm,
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
import Api from '../components/Api.js';



const api = new Api(options);


const popupWithImage = new PopupWithImage('.popup_type_card', '.popup__image', '.popup__card-title');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__description',
  avatarSelector: '.profile__avatar',
  getUserInfoApi: () => {
    return api.getUserInfo()
  },
  setUserInfoApi: (name, about) => {
    return api.setUserInfo(name, about)
  },
  setAvatarApi: (imageLink) => {
    return api.setAvatar(imageLink)
  }
}, options);

userInfo.getUserInfo();


const section = new Section(
  {
    items: initialCards,
    renderer: () => {
      api.geiInitialCards()
        .then(cards => {
          cards.forEach(cardItem => {
            let isLiked = false;
            const userId = userInfo.getUserId();
            cardItem.likes.forEach(user => {
              if (user._id === userId) {
                isLiked = true;
              }
            })
            const cardElement = createCard(cardItem.name, cardItem.link, cardItem.likes.length, cardItem.owner, cardItem._id, isLiked);
            section.addItem(cardElement);
          });
        })
    }
  }, '.elements');

section.rendererItems();

const popupDelete = new PopupWithButton({
  popupSelector: '.popup_type_delete',
  formSelector: '.popup__form',
  handleFormSubmit: (cardId, card) => {
    popupDelete.close();
    api.removeCard(cardId, card);
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
      if (isLiked) {
        return api.deslikeCard(cardId);
      }
      else {
        return api.likeCard(cardId)
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
const editavatarValidator = new FormValidator(config, popupEditAvatarForm);
editavatarValidator.enableValidation();


const popupUserInfo = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (data) => {
    popupEditCardBtn.textContent += '...';

    userInfo.setUserInfo(data['edit-form-name'], data['edit-form-description'])
      .then(res => {
        popupEditCardBtn.textContent = "Сохранить";
        popupUserInfo.close();
      })

  }
});
popupUserInfo.setEventListeners();

const popupCardInfo = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (data) => {

    popupAddCardBtn.textContent += '...';

    api.addCard(data['edit-form-name'], data['edit-form-description'])
      .then((res) => {
        popupAddCardBtn.textContent = 'Создать';
        const cardElement = createCard(data['edit-form-name'], data['edit-form-description'], 0, userInfo.getUserId(), res._id, false);
        section.addItem(cardElement);
        popupCardInfo.close();
      })
  }
});
popupCardInfo.setEventListeners();



profileEditButton.addEventListener('click', function () {

  popupUserInfo.open();
  api.getUserInfo()
    .then(data => {
      popupEditProfileTitle.value = data.name;
      popupEditProfileDescription.value = data.about;
    })
});

profileAddButton.addEventListener('click', function () {
  popupCardInfo.open();

});

const popupAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (data) => {

    popupEditAvatarBtn.textContent += '...';

    userInfo.setAvatar(data['edit-form-description'])
      .then((res) => {
        popupEditAvatarBtn.textContent = 'Сохранить';

        popupAvatar.close();
      })
  }
});
popupAvatar.setEventListeners();

profileEditAvatar.addEventListener('click', () => {
  popupAvatar.open();
});