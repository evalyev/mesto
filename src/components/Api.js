export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getUserInfo() {
    fetch(this._url + '/users/me', {
      headers: this._headers
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        throw res.status;
      })

  }
}