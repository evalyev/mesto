let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let popupName = document.querySelector('.popup__input-text_profile_name');
let popupDescription = document.querySelector('.popup__input-text_profile_description');
let popupClose = document.querySelector('.popup__close');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let profileEditButton = document.querySelector('.profile__edit-button');

const elementContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element');

const initialCards = [
  {
    name: 'Архыз',
    link: './images/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: './images/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: './images/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: './images/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: './images/baikal.jpg'
  }
]; 

profileEditButton.addEventListener('click', openPopup);

popupClose.addEventListener('click', closePopup);

popupForm.addEventListener('submit', formSubmitHandler); 

initialCards.forEach(item => {
  elementContainer.append(addCard(item.name, item.link));
})

function openPopup() {
  popup.classList.add('popup_opened');
  popupName.setAttribute('value', profileName.textContent);
  popupDescription.setAttribute('value', profileDescription.textContent);
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup();
}

function addCard(title, imageLink) {
  const newCard = cardTemplate.content.querySelector('.element').cloneNode(true);
  newCard.querySelector('.element__title').textContent = title;
  const elementImage = newCard.querySelector('.element__image');
  elementImage.src = imageLink;
  elementImage.alt = title;
  return newCard;
}

