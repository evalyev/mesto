import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(titleData, imageLink) {
    super.open();
    this._cardImage = this._popup.querySelector('.popup__image');
    this._cardTitle = this._popup.querySelector('.popup__card-title');

    this._cardImage.src = imageLink;
    this._cardImage.alt = titleData;
    this._cardTitle.textContent = titleData;
  }
}