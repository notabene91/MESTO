export class Api {
  constructor(config) {
    this.headers = config.headers;
    this.url = config.url;
  }
    
  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
  }


  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
  }

  addNewCard(name, link) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`);
      });
  }

  likeCard(id) {
    return fetch(`${this.url}/cards/like/${id}/`, {
      method: "PUT",
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
  }

  unlikeCard(id) {
    return fetch(`${this.url}/cards/like/${id}/`, {
      method: "DELETE",
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
  }
  
  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
  }

  editUserInfo(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
  }

  editUserPhoto(avatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
  }
}