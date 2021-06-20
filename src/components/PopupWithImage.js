import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, titleSelector) {
    super(popupSelector);
    this._cardImage = this._popup.querySelector(imageSelector);
    this._cardTitle = this._popup.querySelector(titleSelector);
  }

  open(titleData, imageLink) {
    super.open();

    this._cardImage.src = imageLink;
    this._cardImage.alt = titleData;
    this._cardTitle.textContent = titleData;
  }
}