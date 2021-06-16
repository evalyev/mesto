class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose() {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._closeBtn = this._popup.querySelector('.popup__close');
    this._closeBtn.addEventListener('click', this.close);
  }
}