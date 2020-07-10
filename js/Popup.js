class Popup {
  constructor(popup) {
    this.popup = popup;
    this.close = this.close.bind(this);
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
    this.popup.addEventListener('click', (event) => {
      if (event.target == this.popup) this.close()
    });
  }

  open() {
    this.popup.classList.add('popup_is-opened');
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
  }
}

class PopupPicture extends Popup {
  constructor(popup, image) {
    super(popup);
    this.image = image;
  }

  renderCard(target) {
    const targetUrl = target.style.backgroundImage.split('"');
    this.image.setAttribute('src', `${targetUrl[1]}`);
  }
}
