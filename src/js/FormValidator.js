export class FormValidator {
  
  constructor(form, submitButton, errMessage) {
    this.form = form;
    this.inputs = Array.from(this.form.elements)
    this.submitButton = submitButton;
    this.errorMessage = errMessage;
    this.setEventListeners();
  }

  checkInputValidity(input) {
    input.setCustomValidity("")

    if (input.validity.valueMissing) {
      input.setCustomValidity(this.errorMessage.empty);
      return false;
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(this.errorMessage.wrongLength);
      return false;
    }

    if (input.validity.typeMismatch) {
      input.setCustomValidity(this.errorMessage.wrongUrl)
      return false;
    }

    return input.checkValidity();
  }

  isFormValid() {
    let valid = true;
    this.inputs.forEach((input) => {
      if (input.type !== 'button' && input.type !== 'submit') {
        if (!this.checkInputValidity(input)) valid = false;
      }
    });
    return valid;
  }

  setSubmitButtonState() {
    if (this.isFormValid()) {
      this.submitButton.removeAttribute('disabled');
      this.submitButton.classList.add('popup__button_active');
    } else {
      this.submitButton.setAttribute('disabled', true);
      this.submitButton.classList.remove('popup__button_active');
    }
  }

  showInputError(input) {
    const error = input.parentNode.querySelector(`#error-${input.id}`);
    if (!this.checkInputValidity(input)) {
      error.textContent = input.validationMessage;
      error.classList.remove('popup__error-message_hidden');
    }
    else {
      error.textContent = "";
      error.classList.add('popup__error-message_hidden');
    }
  }

  clearErrors() {
    const errors = this.form.querySelectorAll('.popup__error-message')
    errors.forEach((err) => {
      err.textContent = "";
      err.classList.add('popup__error-message_hidden');
    })
  }

  setEventListeners() {
    this.form.addEventListener('input', this.setSubmitButtonState.bind(this));
    this.form.addEventListener('input', (event) => this.checkInputValidity(event.target))
    this.form.addEventListener('input', (event) => this.showInputError(event.target))
  }
}
