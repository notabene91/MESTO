export class Card {

  constructor(cardData, api, markup) {
    this.cardData = cardData;
    this.name = cardData.name;
    this.link = cardData.link;
    this.count = cardData.likes.length;
    this.markup = markup;
    this.remove = this.remove.bind(this);
    this.like = this.like.bind(this);
    this.api = api;
  }

  create() {
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', this.markup);
    element.querySelector('.place-card__name').textContent = this.name;
    element.querySelector('.place-card__like-count').textContent = this.count;
    element.querySelector('.place-card__image').setAttribute('style', `background-image: url(${this.link})`);
    const isLiked = this.cardData.likes.some(function (like) {
      return like._id.includes('4f9621021b6b015f4bf6c623')
    })
    if (isLiked) {
      element.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
    }
    if (this.cardData.owner._id !== '4f9621021b6b015f4bf6c623') {
      element.querySelector('.place-card__delete-icon').classList.add('place-card__delete-icon_hidden');
    }
    element.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    element.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    this.card = element;
    return element;
  }

  like(event) {
    if (event.target.classList.contains('place-card__like-icon_liked')) {
      this.api.unlikeCard(this.cardData._id)
        .then((res) => {
          event.target.classList.remove('place-card__like-icon_liked');
          this.card.querySelector('.place-card__like-count').textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else {
      this.api.likeCard(this.cardData._id)
        .then((res) => {
          event.target.classList.add('place-card__like-icon_liked');
          this.card.querySelector('.place-card__like-count').textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  remove() {
    this.api.deleteCard(this.cardData._id)
      .then(() => {
        this.card.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
        this.card.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
        this.card.remove();
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
