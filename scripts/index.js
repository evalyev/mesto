let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let popupName = document.querySelector('.popup__input-text_profile_name');
let popupDescription = document.querySelector('.popup__input-text_profile_description');
let popupClose = document.querySelector('.popup__close');
const popupTitle = document.querySelector('.popup__title')
const popupSubmit = document.querySelector('.popup__submit');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

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

profileAddButton.addEventListener('click', function() {
  openPopup();
  cardPopup();
})

profileEditButton.addEventListener('click', function() {
  openPopup();
  profilePopup();
});

popupClose.addEventListener('click', closePopup);

popupForm.addEventListener('submit', formSubmitHandler); 

initialCards.forEach(item => {
  elementContainer.append(addCard(item.name, item.link));
})


function openPopup() {
  popup.classList.add('popup_opened');
}

function cardPopup() {
  popupTitle.textContent = 'Новое место';
  popupName.setAttribute('placeholder', 'Название');
  popupDescription.setAttribute('placeholder', 'Ссылка на картинку');
  popupName.value = '';
  popupDescription.value = '';
  popupSubmit.textContent = 'Создать';
}

function profilePopup() {
  popupTitle.textContent = 'Редактировать профиль';
  popupName.setAttribute('placeholder', 'Ваше имя');
  popupDescription.setAttribute('placeholder', 'Описание');
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  popupSubmit.textContent = 'Сохранить';
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  if(popupTitle.textContent === 'Редактировать профиль') {
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  }
  else if (popupTitle.textContent === 'Новое место') {
    elementContainer.prepend(addCard(popupName.value, popupDescription.value));
  }
  closePopup();
}

function addCard(title, imageLink) {
  const newCard = cardTemplate.content.querySelector('.element').cloneNode(true);
  const elementImage = newCard.querySelector('.element__image');
  const elementLike = newCard.querySelector('.element__like');
  const elementTrash = newCard.querySelector('.element__trash');

  newCard.querySelector('.element__title').textContent = title;
  elementImage.src = imageLink;
  elementImage.alt = title;
  elementLike.addEventListener('click', function(e) {
    e.target.classList.toggle('element__like_active');
  });
  elementTrash.addEventListener('click', function(e) {
    e.target.closest('.element').remove();
  })
  
  return newCard;
}

