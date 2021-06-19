export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._closeBtn = this._popup.querySelector('.popup__close');
    this._closeBtn.addEventListener('click', this.close.bind(this));

    this._popup.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close.bind(this);
        this.close();
      }
    });
  }

}