import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('input'));
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => formValues[input.name] = input.value);
    return formValues;
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