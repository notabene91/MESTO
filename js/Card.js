class Card {
  static markup = `
      <div class = "place-card">
        <div class="place-card__image" style="background-image: url()">
        <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name"></h3>
        <div class=place-card__like-section>
          <button class="place-card__like-icon"></button>
          <p class="place-card__like-count"></p>
        </div>
      </div>
      </div>
    `;

  constructor(cardData, api) {
    this.cardData = cardData;
    this.name = cardData.name;
    this.link = cardData.link;
    this.count = cardData.likes.length;
    this.markup = Card.markup;
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
