export default class UserInfo {
  constructor({userNameSelector, userInfoSelector, avatarSelector, getUserInfoApi, setUserInfoApi, setAvatarApi}) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._getUserInfoApi = getUserInfoApi;
    this._setUserInfoApi = setUserInfoApi;
    this._setAvatarApi = setAvatarApi;

    this._userId;
    // this._url = config.url + '/users/me';
    // this._headers = config.headers;
  }

  // getUserInfo() {
  //   const data = {};
  //   data.userName = this._userName.textContent;
  //   data.userInfo = this._userInfo.textContent;
  //   return data;
  // }

  // getUserInfo() {
  //   return fetch(this._url, {
  //     headers: this._headers
  //   })
  //     .then(res => {
  //       if(res.ok) {
  //         return res.json();
  //       }
  //       throw res.status;
  //     })
  //     .then(res => {
  //       this._userId = res._id;
  //       return res;
  //     })
  // }

  getUserInfo() {
    this._getUserInfoApi()
      .then(data => {
        this._userId = data._id;
        this._userName.textContent = data.name;
        this._userInfo.textContent = data.about;
        this._avatar.src = data.avatar;
        return data;
      })
  }

  getUserId() {
    return this._userId;
  }

  setUserInfo(dataUserName, dataUserInfo) {

    // return fetch(this._url, {
    //   method: 'PATCH',
    //   headers: this._headers,
    //   body: JSON.stringify({
    //     name: dataUserName,
    //     about: dataUserInfo
    //   })
    // })
    //   .then(res => {
    //     if(res.ok) {
    //       this._userName.textContent = dataUserName;
    //       this._userInfo.textContent = dataUserInfo;
    //       return res.json();
    //     }
    //     throw res.status;
    //   })

      return this._setUserInfoApi(dataUserName, dataUserInfo)
        .then(data => {
          this._userName.textContent = dataUserName;
          this._userInfo.textContent = dataUserInfo;
          return data
        })
  }

  setAvatar(imageLink) {

    // return fetch(this._url + '/avatar', {
    //   method: 'PATCH',
    //   headers: this._headers,
    //   body: JSON.stringify({
    //     avatar: imageLink,
    //   })
    // })
    //   .then(res => {
    //     if(res.ok) {
    //       this._avatar.src = imageLink;
    //       return res.json();
    //     }
    //     throw res.status;
    //   })

    return this._setAvatarApi(imageLink)
      .then(res => {
        this._avatar.src = res.avatar;
        return res;
      })

  }
}