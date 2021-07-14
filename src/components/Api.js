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

  }


  removeCard(cardId) {

    return fetch(this._url + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
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

  }


}