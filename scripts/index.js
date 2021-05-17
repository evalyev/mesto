const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const userNameInput = popupEditProfile.querySelector('.popup__input-text_profile_name');
const userDescriptionInput = popupEditProfile.querySelector('.popup__input-text_profile_description');
const popupEditProfileCloseBtn = popupEditProfile.querySelector('.popup__close');
const popupEditProfileTitle = popupEditProfile.querySelector('.popup__title')
const popupEditProfileSubmitBtn = popupEditProfile.querySelector('.popup__submit');

const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');
const cardTitleInput = popupAddCard.querySelector('.popup__input-text_profile_name');
const cardLinkInput = popupAddCard.querySelector('.popup__input-text_profile_description');
const popupAddCardCloseBtn = popupAddCard.querySelector('.popup__close');

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

initialCards.forEach(item => {
  elementContainer.append(addCard(item.name, item.link));
})

profileEditButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
  profilePopup();
  toggleButtonState(Array.from(popupEditProfile.querySelectorAll('popup__input-text')), popupEditProfileSubmitBtn);
});

popupEditProfileCloseBtn.addEventListener('click', () => closePopup(popupEditProfile));

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

popupAddCardCloseBtn.addEventListener('click', () => closePopup(popupAddCard));

popupAddCard.addEventListener('click', evt => {
  if(evt.target.classList.contains('popup_opened')) {
    closePopup(popupAddCard);
  }
});

popupCardCloseBtn.addEventListener('click', () => closePopup(popupCard));

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
  evt.preventDefault();
  elementContainer.prepend(addCard(cardTitleInput.value, cardLinkInput.value));
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