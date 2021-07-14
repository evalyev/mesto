export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      headers: this._headers
    })
      .then(this._checkResponse)

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
      .then(this._checkResponse)

  }

  setAvatar(imageLink) {

    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: imageLink,
      })
    })
      .then(this._checkResponse)


  }


  geiInitialCards() {
    return fetch(this._url + '/cards', {
      headers: this._headers
    })
      .then(this._checkResponse)
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
      .then(this._checkResponse)

  }


  removeCard(cardId) {

    return fetch(this._url + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  likeCard(cardId) {
    return fetch(this._url + '/cards/likes/' + cardId, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._checkResponse)

  }

  deslikeCard(cardId) {
    return fetch(this._url + '/cards/likes/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse)

  }


}