export default class UserInfo {
  constructor({userNameSelector, userInfoSelector, avatarSelector}, config) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._url = config.url + '/users/me';
    this._headers = config.headers;
  }

  // getUserInfo() {
  //   const data = {};
  //   data.userName = this._userName.textContent;
  //   data.userInfo = this._userInfo.textContent;
  //   return data;
  // }

  getUserInfo() {
    return fetch(this._url, {
      headers: this._headers
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        throw res.status;
      })
      .then(res => {
        this._userId = res._id;
        return res;
      })
  }

  getUserId() {
    return this._userId;
  }

  setUserInfo(dataUserName, dataUserInfo) {

    fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: dataUserName,
        about: dataUserInfo
      })
    })
      .then(res => {
        if(res.ok) {
          this._userName.textContent = dataUserName;
          this._userInfo.textContent = dataUserInfo;
          return res.json();
        }
        throw res.status;
      })
  }

  setAvatar(imageLink) {
    this._avatar.src = imageLink;
  }
}