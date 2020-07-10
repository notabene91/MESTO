import './style.css';
import { Api } from "./js/Api";
import { Card } from "./js/Card";
import { CardList } from "./js/CardList";
import { FormValidator } from "./js/FormValidator";
import { Popup } from "./js/Popup";
import { PopupPicture } from "./js/Popup";
import { UserInfo } from "./js/UserInfo";

(function () {
    const placeFormButton = document.querySelector('.user-info__button_place');
    const profileFormButton = document.querySelector('.user-info__button_profile');
    const list = document.querySelector('.places-list');
    const placeForm = document.forms.place;
    const profileForm = document.forms.profile;
    const avatarForm = document.forms.avatar;
    const buttonAddProfile = document.getElementById('button__profile')
    const buttonAddPlace = document.getElementById('button__place');
    const buttonAddAvatar = document.getElementById('button__avatar');
    const popupPlace = document.getElementById('place');
    const popupProfile = document.getElementById('profile');
    const popupPicture = document.getElementById('picture');
    const popupAvatar = document.getElementById('avatar');
    const popupImage = document.querySelector('.popup__image');
    const addPlacePopup = new Popup(popupPlace);
    const addProfilePopup = new Popup(popupProfile);
    const addPicturePopup = new PopupPicture(popupPicture, popupImage)
    const addAvatarPopup = new Popup(popupAvatar);
    const name = document.querySelector('#name');
    const about = document.querySelector('#about');
    const link = document.querySelector('#link');
    const title = document.querySelector('#title');
    const avatar = document.querySelector('#avatar-link');
    const userName = document.querySelector('.user-info__name');
    const userAbout = document.querySelector('.user-info__about');
    const userAvatar = document.querySelector('.user-info__photo');
    const loadingInfo = document.querySelector('.user-info__loading')
    const objForUserInfo = {
        userName: userName,
        userAbout: userAbout,
        name: name,
        about: about,
        userAvatar: userAvatar
    }
    const config = {
        headers: {
            authorization: '5efa3e04-76d8-4219-be1c-285105682e00',
            'Content-Type': 'application/json'
        },
        url: 'https://praktikum.tk/cohort11',
    }

    const markup = `
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
    const errMessage  = {
        empty: "Это обязательное поле",
        wrongLength: "Должно быть от 2 до 30 символов",
        wrongUrl: "Здесь должна быть ссылка"
      }
        
    const userInfo = new UserInfo(objForUserInfo);
    const formValidatorProfile = new FormValidator(profileForm, buttonAddProfile, errMessage);
    const formValidatorPlace = new FormValidator(placeForm, buttonAddPlace, errMessage);
    const formValidatorAvatar = new FormValidator(avatarForm, buttonAddAvatar, errMessage);
    const api = new Api(config);
    const addCardFunction = (card) => (new Card(card, api, markup).create());
    const cardList = new CardList(list, addCardFunction)

    api.getUserInfo().then(res => {
        userInfo.updateUserInfo(res.name, res.about)
        userInfo.renderAvatar(res.avatar)
    })

    loadingInfo.textContent = "Идет загрузка карточек...";

    api.getInitialCards()
        .then((res) => {
            cardList.render(res)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            loadingInfo.textContent = "";
            loadingInfo.classList.add('user-info__loading_hidden');
        })

    document.addEventListener('click', ({ target }) => {
        if (target.classList.contains('place-card__image')) {
            addPicturePopup.open();
            addPicturePopup.renderCard(target)
        }
    });

    placeFormButton.addEventListener('click', e => {
        placeForm.reset();
        formValidatorPlace.setSubmitButtonState();
        formValidatorPlace.clearErrors();
        addPlacePopup.open()
    })

    profileFormButton.addEventListener('click', e => {
        api.getUserInfo()
            .then(res => {
                userInfo.setUserInfo(res.name, res.about);
            })
            .catch((err) => {
                console.log(err)
            })
        userInfo.setUserInfo(userName.textContent, userAbout.textContent);
        formValidatorProfile.setSubmitButtonState();
        formValidatorProfile.clearErrors();
        addProfilePopup.open();
    })

    placeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        buttonAddPlace.textContent = 'Загрузка...';
        buttonAddPlace.setAttribute('style', 'font-size: 24px');
        api.addNewCard(title.value, link.value)
            .then((res) => {
                const newCard = new Card(res, api).create();
                cardList.addCard(newCard);
                addPlacePopup.close();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                buttonAddPlace.textContent = '+';
            })
    })

    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        buttonAddProfile.textContent = 'Загрузка...';
        api.editUserInfo(name.value, about.value)
            .then((res) => {
                userInfo.updateUserInfo(res.name, res.about);
                addProfilePopup.close();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                buttonAddProfile.textContent = 'Сохранить';
            })
    })


    userAvatar.addEventListener('click', e => {
        avatarForm.reset();
        addAvatarPopup.open();
        formValidatorAvatar.setSubmitButtonState();
        formValidatorAvatar.clearErrors();
    })

    avatarForm.addEventListener('submit', (event) => {
        event.preventDefault()
        buttonAddAvatar.textContent = 'Загрузка...';
        api.editUserPhoto(avatar.value)
            .then(() => {
                userInfo.renderAvatar(avatar.value);
                addAvatarPopup.close();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                buttonAddAvatar.textContent = 'Сохранить';
            })
    })
})()

