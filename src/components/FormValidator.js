export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorActiveClass);
  }
  
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorActiveClass);
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
    else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    }
    else {
      this._buttonElement.classList.remove(this._config.submitButtonInactiveClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
    this._formElement.addEventListener("reset", () => {
      this._disableButton();
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    });
  }

  _disableButton() {
    this._buttonElement.classList.add(this._config.submitButtonInactiveClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  enableValidation() {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}