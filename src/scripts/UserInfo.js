class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    const data = {};
    data.userName = this._userName.textContent;
    data.userInfo = this._userInfo.textContent;
    return data;
  }

  setUserInfo(dataUserName, dataUserInfo) {
    this._userName.textContent = dataUserName;
    this._userInfo.textContent = dataUserInfo;
  }
}