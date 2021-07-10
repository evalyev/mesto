export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      headers: this._headers
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 

  }

  setUserInfo(dataUserName, dataUserInfo) {

    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: dataUserName,
        about: dataUserInfo
      })
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 
  }

  setAvatar(imageLink) {

    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: imageLink,
      })
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 

  }


  geiInitialCards() {
    return fetch(this._url + '/cards', {
      headers: this._headers
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 
  }


  addCard(title, description) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: description
      })
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 
  }


  removeCard(cardId, card) {

    fetch(this._url + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => {
        card.remove();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 
  }

  likeCard(cardId) {
    return fetch(this._url + '/cards/likes/' + cardId, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 
  }

  deslikeCard(cardId) {
    return fetch(this._url + '/cards/likes/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 
  }


}