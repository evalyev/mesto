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

const popupCard = document.querySelector('.popup_type_card');
const popupCardCloseBtn = popupCard.querySelector('.popup__close');
const popupCardImage = popupCard.querySelector('.popup__image');
const popupCardTitle = popupCard.querySelector('.popup__card-title')

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const elementContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input-text_type_error',
  errorActiveClass: 'popup__input-error_active',
  submitButtonInactiveClass: 'popup__submit_inactive'
};

class Card {
  constructor(title, imageLink, templateSelector) {
    this._title = title;
    this._imageLink = imageLink;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  
    return cardElement;
  }

  _toggleLike(e) {
    e.target.classList.toggle('element__like_active');
  }

  _removeElement(e) {
    e.target.closest('.element').remove();
  }

  _openCard(e) {
    const popupTitle = e.target.closest('.element').querySelector('.element__title').textContent;
    const popupLink = e.target.src;
    openPopupCard(popupCard, popupTitle, popupLink);
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (e) =>{
      this._toggleLike(e);
    });
    this._element.querySelector('.element__trash').addEventListener('click', (e) =>{
      this._removeElement(e);
    });
    this._element.querySelector('.element__image').addEventListener('click', (e) =>{
      this._openCard(e);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
  
    this._element.querySelector('.element__image').src = this._imageLink;
    this._element.querySelector('.element__title').textContent = this._title;
  
    // Вернём элемент наружу
    return this._element;
  } 
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  const formElement = popup.querySelector('.popup__form');

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
  const newCard = cardTemplate.content.querySelector('.element').cloneNode(true);
  const elementImage = newCard.querySelector('.element__image');
  const elementLike = newCard.querySelector('.element__like');
  const elementTrash = newCard.querySelector('.element__trash');

  newCard.querySelector('.element__title').textContent = title;
  elementImage.src = imageLink;
  elementImage.alt = title;
  elementLike.addEventListener('click', function (e) {
    e.target.classList.toggle('element__like_active');
  });
  elementTrash.addEventListener('click', function (e) {
    e.target.closest('.element').remove();
  })
  elementImage.addEventListener('click', function (e) {
    const popupTitle = e.target.closest('.element').querySelector('.element__title').textContent;
    const popupLink = e.target.src;
    openPopupCard(popupCard, popupTitle, popupLink);
  })


  return newCard;
}

function openPopupCard(popupCard, titleData, imageLink) {
  openPopup(popupCard);
  popupCardImage.src = imageLink;
  popupCardImage.alt = titleData;
  popupCardTitle.textContent = titleData;
}


initialCards.forEach(item => {
  elementContainer.append(createCard(item.name, item.link));
})

enableValidation(config);

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