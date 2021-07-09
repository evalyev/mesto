export class Card {
  constructor(title, imageLink, likes, ownerId, userId, templateSelector, { handleCardClick, handleCardTrash }) {
    this._title = title;
    this._imageLink = imageLink;
    this._likes = likes;
    this._ownerId = ownerId;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardTrash = handleCardTrash;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _toggleLike(e) {
    e.target.classList.toggle('element__like_active');
  }

  _removeElement() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (e) => {
      this._toggleLike(e);
    });

    if (this._ownerId === this._userId) {
      this._element.querySelector('.element__trash').addEventListener('click', () => {
        this._removeElement();
        this._handleCardTrash();
      });
    }

    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._imageLink);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._setEventListeners();

    this._elementImage.src = this._imageLink;
    this._elementImage.alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__like-amount').textContent = this._likes;


    if (this._ownerId !== this._userId) {
      this._element.querySelector('.element__trash').remove();
    }

    // Вернём элемент наружу
    return this._element;
  }
}