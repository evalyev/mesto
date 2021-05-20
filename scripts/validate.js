function showInputError(formElement, inputElement, errorMessage, {inputErrorClass, errorActiveClass}) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorActiveClass);
}

function hideInputError(formElement, inputElement, {inputErrorClass, errorActiveClass}) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorActiveClass);
}

function isValid(formElement, inputElement, config) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  }
  else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, submitButtonInactiveClass) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(submitButtonInactiveClass);
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.classList.remove(submitButtonInactiveClass);
    buttonElement.removeAttribute('disabled');
  }
}

function setEventListeners(formElement, {inputSelector, submitButtonSelector, submitButtonInactiveClass, ...restConfig}) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, submitButtonInactiveClass);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, restConfig);
      toggleButtonState(inputList, buttonElement, submitButtonInactiveClass);
    });
  });
}

function enableValidation({formSelector, ...restConfig}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement, restConfig);
  });
}