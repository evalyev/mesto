let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__container');
let popupName = document.querySelector('.popup__name');
let popupDescription = document.querySelector('.popup__description');
let popupClose = document.querySelector('.popup__close');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let profileEditButton = document.querySelector('.profile__edit-button');

function editButton() {
  popup.classList.add('popup_opened');
  popupName.setAttribute('value', profileName.textContent);
  console.log(profileName.textContent);
  popupDescription.setAttribute('value', profileDescription.textContent);
}

profileEditButton.addEventListener('click', editButton);

popupClose.addEventListener('click', function(){
  popup.classList.remove('popup_opened');
  console.log(popupName.getAttribute('value'));
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.getAttribute('value');
  console.log(popupName.getAttribute('value'));
  profileDescription.textContent = popupDescription.getAttribute('value');
  console.log(popupDescription.getAttribute('value'));
  popup.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', formSubmitHandler); 