import Popup from "../components/Popup.js";

export default class PopupWithButton extends Popup {
  constructor({popupSelector, formSelector, handleFormSubmit}) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._thisCardId;
    this._thisCard;

  }

  open(cardId, cardElement) {
    super.open();
    this._thisCardId = cardId;
    this._thisCard = cardElement;
  }

  deleteCard() {
    
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      
      this._handleFormSubmit(this._thisCardId, this._thisCard);
    });
  }
}