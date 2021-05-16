const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupEditProfileName = popupEditProfile.querySelector('.popup__input-text_profile_name');
const popupEditProfileDescription = popupEditProfile.querySelector('.popup__input-text_profile_description');
const popupEditProfileClose = popupEditProfile.querySelector('.popup__close');
const popupEditProfileTitle = popupEditProfile.querySelector('.popup__title')
const popupEditProfileSubmit = popupEditProfile.querySelector('.popup__submit');

const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');
const popupAddCardTitle = popupAddCard.querySelector('.popup__input-text_profile_name');
const popupAddCardImageLink = popupAddCard.querySelector('.popup__input-text_profile_description');
const popupAddCardClose = popupAddCard.querySelector('.popup__close');

const popupCard = document.querySelector('.popup_type_card');
const popupCardClose = popupCard.querySelector('.popup__close');
const popupCardImage = popupCard.querySelector('.popup__image');
const popupCardTitle = popupCard.querySelector('.popup__card-title')

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const elementContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element');

initialCards.forEach(item => {
  elementContainer.append(addCard(item.name, item.link));
})

profileEditButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
  profilePopup();
  toggleButtonState(Array.from(popupEditProfile.querySelectorAll('popup__input-text')), popupEditProfileSubmit);
});

popupEditProfileClose.addEventListener('click', () => closePopup(popupEditProfile));

popupEditProfile.addEventListener('click', evt => {
  if(evt.target.classList.contains('popup_opened')){
    closePopup(popupEditProfile);
  }
});

popupEditProfileForm.addEventListener('submit', submitPopupEditProfile);

profileAddButton.addEventListener('click', function () {
  openPopup(popupAddCard);
})

popupAddCardForm.addEventListener('submit', submitPopupAddCard);

popupAddCardClose.addEventListener('click', () => closePopup(popupAddCard));

popupAddCard.addEventListener('click', evt => {
  if(evt.target.classList.contains('popup_opened')) {
    closePopup(popupAddCard);
  }
});

popupCardClose.addEventListener('click', () => closePopup(popupCard));

popupCard.addEventListener('click', evt => {
  if(evt.target.classList.contains('popup_opened')) {
    closePopup(popupCard);
  }
});

document.addEventListener('keydown', evt => {
  if(evt.key === 'Escape') {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
  }
});

enableValidation();


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function profilePopup() {
  popupEditProfileName.value = profileName.textContent;
  popupEditProfileDescription.value = profileDescription.textContent;
}

function submitPopupEditProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditProfileName.value;
  profileDescription.textContent = popupEditProfileDescription.value;
  closePopup(popupEditProfile);
}

function submitPopupAddCard(evt) {
  evt.preventDefault();
  elementContainer.prepend(addCard(popupAddCardTitle.value, popupAddCardImageLink.value));
  closePopup(popupAddCard);
  popupAddCardForm.reset();
  toggleButtonState(Array.from(popupAddCardForm.querySelectorAll('.popup__input-text')), popupAddCardForm.querySelector('.popup__submit'));
}

function addCard(title, imageLink) {
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
    openPopup(popupCard);
    openPopupCard(popupTitle, popupLink);
  })


  return newCard;
}

function openPopupCard(titleData, imageLink) {
  popupCardImage.src = imageLink;
  popupCardImage.alt = titleData;
  popupCardTitle.textContent = titleData;
}