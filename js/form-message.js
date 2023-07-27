import { isEscapeKey } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

function isEscPress(evt, callback) {

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    callback();
  }
}

const onSuccessCloseButtonClick = () => {
  closeSuccessMessage();
};

const onCloseSuccessMessage = (evt) => isEscPress(evt, closeSuccessMessage);

const onSuccessDocumentClick = (evt) => {
  evt.preventDefault();

  if (!evt.target.closest('.success__inner')) {
    closeSuccessMessage();
  }
};

const showSuccessMessage = () => {
  const successModal = successTemplate.cloneNode(true);
  document.body.append(successModal);

  successModal.querySelector('.success__button').addEventListener('click', onSuccessCloseButtonClick);
  document.addEventListener('click', onSuccessDocumentClick);
  document.addEventListener('keydown', onCloseSuccessMessage);
};

function closeSuccessMessage() {
  document.body.querySelector('.success').remove();

  document.removeEventListener('click', onSuccessDocumentClick);
  document.removeEventListener('keydown', onCloseSuccessMessage);
}

const onErrorCloseButtonClick = () => {
  closeErrorMessage();
};

const onErrorDocumentKeydown = (evt) => isEscPress(evt, closeErrorMessage);

const onErrorDocumentClick = (evt) => {
  evt.preventDefault();

  if (!evt.target.closest('.error__inner')) {
    closeErrorMessage();
  }
};

const showErrorMessage = () => {
  const errorModal = errorTemplate.cloneNode(true);
  document.body.append(errorModal);
  document.body.classList.add('has-modal');

  errorModal.querySelector('.error__button').addEventListener('click', onErrorCloseButtonClick);
  document.addEventListener('click', onErrorDocumentClick);
  document.addEventListener('keydown', onErrorDocumentKeydown);
};

function closeErrorMessage() {
  document.body.querySelector('.error').remove();
  document.body.classList.remove('has-modal');

  document.removeEventListener('click', onErrorDocumentClick);
  document.removeEventListener('keydown', onErrorDocumentKeydown);
}

export{showErrorMessage,showSuccessMessage};
