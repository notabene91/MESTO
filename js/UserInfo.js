class UserInfo {
    constructor(objForUserInfo) {
      this.nameElement = objForUserInfo.userName;
      this.aboutElement = objForUserInfo.userAbout;
      this.nameInput = objForUserInfo.name;
      this.aboutInput = objForUserInfo.about;
      this.avatar = objForUserInfo.userAvatar;
    }
  
    setUserInfo(name, about) {
      this.nameInput.value = name;
      this.aboutInput.value = about;
    }
  
    updateUserInfo(name, about) {
      this.nameElement.textContent = name;
      this.aboutElement.textContent = about;
    }

    renderAvatar(link) {
      this.avatar.setAttribute('style', `background-image: url(${link})`)
    }
}
