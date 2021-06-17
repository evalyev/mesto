import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._inputTitle = this._popup.querySelector('.popup__input-text_profile_name');
    this._inputDescription = this._popup.querySelector('.popup__input-text_profile_description');
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputTitleData = this._inputTitle.value;
    this._inputDescriptionData = this._inputDescription.value;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      profileName.textContent = userNameInput.value;
      profileDescription.textContent = userDescriptionInput.value;

      this._close();
    });
  }
}


// Объявление объекта класса 
// const form = new SubmitForm({
//   formSelector: '.form-template',
//   handleFormSubmit: (formData) => {
//     // при создании экземпляра UserCard передаём
//     // ему объект с данными формы
//     const card = new UserCard(formData, '.card-template_type_user');

//     const cardElement = card.generateCard();

//     cardsList.setItem(cardElement);
//   }
// }); 