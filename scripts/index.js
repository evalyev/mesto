let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let popupName = document.querySelector('.popup__input-text_profile_name');
let popupDescription = document.querySelector('.popup__input-text_profile_description');
let popupClose = document.querySelector('.popup__close');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let profileEditButton = document.querySelector('.profile__edit-button');

function openPopup() {
  popup.classList.add('popup_opened');
  popupName.setAttribute('value', profileName.textContent);
  popupDescription.setAttribute('value', profileDescription.textContent);
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openPopup);

popupClose.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup();
}

popupForm.addEventListener('submit', formSubmitHandler); 
