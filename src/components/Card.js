export class Card {
  constructor(title, imageLink, likes, ownerId, userId, cardId, isLiked, templateSelector, { handleCardClick, handleCardTrash, handleCardLike}) {
    this._title = title;
    this._imageLink = imageLink;
    this._likes = likes;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._userId = userId;
    this._isLiked = isLiked;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardTrash = handleCardTrash;
    this._handleCardLike = handleCardLike;
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
    this._isLiked = !this._isLiked;
  }

  _removeElement() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (e) => {
      this._handleCardLike(this._isLiked, this._cardId)
        .then(res => {
          this._toggleLike(e);
          this._likes = res.likes.length;
          this._element.querySelector('.element__like-amount').textContent = this._likes;
          return res;
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        }); 
    });

    if (this._ownerId === this._userId) {
      this._element.querySelector('.element__trash').addEventListener('click', () => {
        // this._removeElement();
        this._handleCardTrash(this._cardId);
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

    if(this._isLiked) {
      this._element.querySelector('.element__like').classList.add('element__like_active');
    }

    if (this._ownerId !== this._userId) {
      this._element.querySelector('.element__trash').remove();
    }

    // Вернём элемент наружу
    return this._element;
  }
}