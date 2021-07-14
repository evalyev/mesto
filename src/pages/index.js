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
  // setUserInfoApi: (name, about) => {
  //   return api.setUserInfo(name, about)
  //     .then(data => {
  //       userInfo.renderInfo(data);
  //       return data;
  //     })
  //     .catch((err) => {
  //       console.log(err); // выведем ошибку в консоль
  //       return Promise.reject(`Ошибка: ${err}`);
  //     });
  // }
}, options);


Promise.all([api.getUserInfo(), api.geiInitialCards()])
  .then(data => {
    userInfo.setUserInfo(data[0]);

    const section = new Section(
      {
        items: data[1],
        renderer: (card) => {
          // api.geiInitialCards()
          //   .then(cards => {
          //     cards.forEach(cardItem => {
          //       let isLiked = false;
          //       const userId = userInfo.getUserId();
          //       cardItem.likes.forEach(user => {
          //         if (user._id === userId) {
          //           isLiked = true;
          //         }
          //       })
          //       const cardElement = createCard(cardItem.name, cardItem.link, cardItem.likes.length, cardItem.owner, cardItem._id, isLiked);
          //       section.addItem(cardElement);
          //     });
          //   })

          let isLiked = false;
          const userId = userInfo.getUserId();
          card.likes.forEach(user => {
            if (user._id === userId) {
              isLiked = true;
            }
          });
          const cardElement = createCard(card.name, card.link, card.likes.length, card.owner, card._id, isLiked);
          section.addItem(cardElement);
        }
      }, '.elements');

    section.rendererItems();


    const popupCardInfo = new PopupWithForm({
      popupSelector: '.popup_type_add-card',
      handleFormSubmit: (data) => {

        popupAddCardBtn.textContent = 'Создать...';

        api.addCard(data['edit-form-name'], data['edit-form-description'])
          .then((res) => {
            popupAddCardBtn.textContent = 'Создать';
            const owner = {};
            owner._id = userInfo.getUserId();
            const cardElement = createCard(data['edit-form-name'], data['edit-form-description'], 0, owner, res._id, false);
            section.addItem(cardElement);
            popupCardInfo.close();
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
      }
    });
    popupCardInfo.setEventListeners();
    profileAddButton.addEventListener('click', function () {
      popupCardInfo.open();

    });

  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


// const section = new Section(
//   {
//     items: initialCards,
//     renderer: () => {
//       api.geiInitialCards()
//         .then(cards => {
//           cards.forEach(cardItem => {
//             let isLiked = false;
//             const userId = userInfo.getUserId();
//             cardItem.likes.forEach(user => {
//               if (user._id === userId) {
//                 isLiked = true;
//               }
//             })
//             const cardElement = createCard(cardItem.name, cardItem.link, cardItem.likes.length, cardItem.owner, cardItem._id, isLiked);
//             section.addItem(cardElement);
//           });
//         })
//     }
//   }, '.elements');

// section.rendererItems();

const popupDelete = new PopupWithButton({
  popupSelector: '.popup_type_delete',
  formSelector: '.popup__form',
  handleFormSubmit: (cardId, card) => {
    api.removeCard(cardId)
      .then(res => {
        card.remove();
        popupDelete.close();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
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
const editAvatarValidator = new FormValidator(config, popupEditAvatarForm);
editAvatarValidator.enableValidation();


const popupUserInfo = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (data) => {
    popupEditCardBtn.textContent = 'Сохранить...';

    api.setUserInfo(data['edit-form-name'], data['edit-form-description'])
      .then(res => {
        userInfo.setUserInfo(res);
        popupEditCardBtn.textContent = "Сохранить";
        popupUserInfo.close();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });

  }
});
popupUserInfo.setEventListeners();

// const popupCardInfo = new PopupWithForm({
//   popupSelector: '.popup_type_add-card',
//   handleFormSubmit: (data) => {

//     popupAddCardBtn.textContent = 'Создать...';

//     api.addCard(data['edit-form-name'], data['edit-form-description'])
//       .then((res) => {
//         popupAddCardBtn.textContent = 'Создать';
//         const owner = {};
//         owner._id = userInfo.getUserId();
//         const cardElement = createCard(data['edit-form-name'], data['edit-form-description'], 0, owner, res._id, false);
//         section.addItem(cardElement);
//         popupCardInfo.close();
//       })
//   }
// });
// popupCardInfo.setEventListeners();



profileEditButton.addEventListener('click', function () {

  popupUserInfo.open();
  const data = userInfo.getUserInfo();
  popupEditProfileTitle.value = data.name;
  popupEditProfileDescription.value = data.about;
});

// profileAddButton.addEventListener('click', function () {
//   popupCardInfo.open();

// });

const popupAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (data) => {

    popupEditAvatarBtn.textContent = 'Сохранить...';

    api.setAvatar(data['edit-form-description'])
      .then((res) => {
        popupEditAvatarBtn.textContent = 'Сохранить';
        userInfo.setAvatar(res.avatar);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
});
popupAvatar.setEventListeners();

profileEditAvatar.addEventListener('click', () => {
  popupAvatar.open();
});