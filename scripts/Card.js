import {openPopup, popupCard, popupCardImage, popupCardTitle} from './index.js';

export class Card {
  constructor(title, imageLink, templateSelector) {
    this._title = title;
    this._imageLink = imageLink;
    this._templateSelector = templateSelector;
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

  _removeElement(e) {
    e.target.closest('.element').remove();
  }

  _openCard(e) {
    const popupTitle = e.target.closest('.element').querySelector('.element__title').textContent;
    const popupLink = e.target.src;
    this._openPopupCard();
  }

  _openPopupCard() {
    openPopup(popupCard);
    popupCardImage.src = this._imageLink;
    popupCardImage.alt = this._title;
    popupCardTitle.textContent = this._title;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (e) =>{
      this._toggleLike(e);
    });
    this._element.querySelector('.element__trash').addEventListener('click', (e) =>{
      this._removeElement(e);
    });
    this._element.querySelector('.element__image').addEventListener('click', (e) =>{
      this._openCard(e);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
  
    this._element.querySelector('.element__image').src = this._imageLink;
    this._element.querySelector('.element__title').textContent = this._title;
  
    // Вернём элемент наружу
    return this._element;
  } 
}