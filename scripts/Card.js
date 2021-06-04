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

  _removeElement() {
    this._element.remove();
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
    this._element.querySelector('.element__trash').addEventListener('click', () =>{
      this._removeElement();
    });
    this._element.querySelector('.element__image').addEventListener('click', () =>{
      this._openPopupCard();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._setEventListeners();
  
    this._elementImage.src = this._imageLink;
    this._elementImage.alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;
  
    // Вернём элемент наружу
    return this._element;
  } 
}