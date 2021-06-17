import '../pages/index.css'; // добавьте импорт главного файла стилей 

import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const userNameInput = popupEditProfile.querySelector('.popup__input-text_profile_name');
const userDescriptionInput = popupEditProfile.querySelector('.popup__input-text_profile_description');
const popupEditProfileCloseBtn = popupEditProfile.querySelector('.popup__close');
const popupEditProfileTitle = popupEditProfile.querySelector('.popup__title')
const popupEditProfileSubmitBtn = popupEditProfile.querySelector('.popup__submit');
const profileInputList = Array.from(popupEditProfile.querySelectorAll('popup__input-text'));

const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');
const cardTitleInput = popupAddCard.querySelector('.popup__input-text_profile_name');
const cardLinkInput = popupAddCard.querySelector('.popup__input-text_profile_description');
const popupAddCardCloseBtn = popupAddCard.querySelector('.popup__close');
const cardInputList = Array.from(popupAddCardForm.querySelectorAll('.popup__input-text'));
const popupAddCardSubmitBtn = popupAddCardForm.querySelector('.popup__submit');

export const popupCard = document.querySelector('.popup_type_card');
const popupCardCloseBtn = popupCard.querySelector('.popup__close');
export const popupCardImage = popupCard.querySelector('.popup__image');
export const popupCardTitle = popupCard.querySelector('.popup__card-title')

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const elementContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element');

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

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupElement = document.querySelector('.popup_opened');
    closePopup(popupElement);
  }
}

function fillEditProfilePopupFields() {
  userNameInput.value = profileName.textContent;
  userDescriptionInput.value = profileDescription.textContent;
}

function submitPopupEditProfile(evt) {
  evt.preventDefault();
  profileName.textContent = userNameInput.value;
  profileDescription.textContent = userDescriptionInput.value;
  closePopup(popupEditProfile);
}

function submitPopupAddCard(evt) {
  const {submitButtonInactiveClass} = config;
  evt.preventDefault();
  elementContainer.prepend(createCard(cardTitleInput.value, cardLinkInput.value));
  closePopup(popupAddCard);
  popupAddCardForm.reset();
  toggleButtonState(cardInputList, popupAddCardSubmitBtn, submitButtonInactiveClass);
}

function resetForm(formElement, buttonElement, { submitButtonInactiveClass, ...restConfig }, needClean) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-text'));
  if (needClean) formElement.reset();
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, restConfig);
  });
  toggleButtonState(inputList, buttonElement, submitButtonInactiveClass);
}

function createCard(title, imageLink) {
  const card = new Card(title, imageLink, '#element', {
    handleCardClick: (title, imageLink) => {
      const popup = new PopupWithImage('.popup_type_card');
      popup.open(title, imageLink);
    }
  });
  const cardElement = card.generateCard();

  return cardElement;
}

function hideInputError(formElement, inputElement, { inputErrorClass, errorActiveClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorActiveClass);
}

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, submitButtonInactiveClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(submitButtonInactiveClass);
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.classList.remove(submitButtonInactiveClass);
    buttonElement.removeAttribute('disabled');
  }
}

function openPopupCard(popupCard, titleData, imageLink) {
  openPopup(popupCard);
  popupCardImage.src = imageLink;
  popupCardImage.alt = titleData;
  popupCardTitle.textContent = titleData;
}


initialCards.forEach(item => {
  const cardElement = createCard(item.name, item.link);

  elementContainer.append(cardElement);
});

const editProfileFormValidator = new FormValidator(config, popupEditProfileForm);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, popupAddCardForm);
addCardFormValidator.enableValidation();

profileEditButton.addEventListener('click', function () {
  fillEditProfilePopupFields();
  resetForm(popupEditProfileForm, popupEditProfileSubmitBtn, config, false);
  openPopup(popupEditProfile);
  toggleButtonState(profileInputList, popupEditProfileSubmitBtn);
});

popupEditProfileCloseBtn.addEventListener('click', () => closePopup(popupEditProfile));

popupEditProfile.addEventListener('click', evt => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popupEditProfile);
  }
});

popupEditProfileForm.addEventListener('submit', submitPopupEditProfile);

profileAddButton.addEventListener('click', function () {
  resetForm(popupAddCardForm, popupEditProfileSubmitBtn, config, true);
  openPopup(popupAddCard);
})

popupAddCardForm.addEventListener('submit', submitPopupAddCard);

popupAddCardCloseBtn.addEventListener('click', () => closePopup(popupAddCard));

popupAddCard.addEventListener('click', evt => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popupAddCard);
  }
});

popupCardCloseBtn.addEventListener('click', () => closePopup(popupCard));

popupCard.addEventListener('click', evt => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popupCard);
  }
});