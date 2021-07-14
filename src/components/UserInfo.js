export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, avatarSelector, setUserInfoApi}) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._avatar = document.querySelector(avatarSelector);
    // this._getUserInfoApi = getUserInfoApi;
    this._setUserInfoApi = setUserInfoApi;
    // this._setAvatarApi = setAvatarApi;

    this._userId;
    // this._url = config.url + '/users/me';
    // this._headers = config.headers;
  }

  getUserInfo() {
    const data = {};
    data.name = this._userName.textContent;
    data.about = this._userInfo.textContent;
    return data;
  }

  getUserId() {
    return this._userId;
  }

  renderInfo(data) {
    this._userId = data._id;
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.about;
    this._avatar.src = data.avatar;
  }

  setUserInfo(dataUserName, dataUserInfo) {
    return this._setUserInfoApi(dataUserName, dataUserInfo);
  }

  setAvatar(imageLink) {
    this._avatar.src = imageLink;
  }
}