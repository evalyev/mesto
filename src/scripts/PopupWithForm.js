import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._inputTitle = this._popup.querySelector('.popup__input-text_profile_name');
    this._inputDescription = this._popup.querySelector('.popup__input-text_profile_description');
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputData = {};
    inputData.inputTitleData = this._inputTitle.value;
    inputData.inputDescriptionData = this._inputDescription.value;
    return inputData;
  }

  setInputValues(dataTitle, dataDescription) {
    this._inputTitle.value = dataTitle;
    this._inputDescription.value = dataDescription;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      
      this._handleFormSubmit(this._getInputValues());
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