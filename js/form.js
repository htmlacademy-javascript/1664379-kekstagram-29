import { isEscapeKey } from './util.js';
import { isTextFieldFocused, pristine } from './form-validate.js';
import { resetEffects } from './effects.js';
import { resetScale } from './scale.js';


const form = document.querySelector('.img-upload__form');//форма загрузки изображения
const imgUploadOverlay = form.querySelector('.img-upload__overlay');//удалить hidden. для body добавить modal-open
const formCancelButton = form.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');
const body = document.querySelector('body');
const preview = document.querySelector('.img-upload__preview img');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const closeModal = () => {
  form.reset();
  pristine.reset();
  preview.src = 'img/upload-default-image.jpg';
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetEffects();
  resetScale();
};

const onDocumentKeydownEscape = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !body.classList.contains('has-modal')) {
    evt.preventDefault();
    closeModal();
  }
};

const showModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydownEscape);
};

form.addEventListener('change', showModal);
formCancelButton.addEventListener('click', closeModal);

const onFormValueChange = () => {
  form.addEventListener('change', showModal);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setOnFormSubmit = (callback) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      callback(new FormData(form));
    }
  });
};

export { closeModal, onFormValueChange, unblockSubmitButton, blockSubmitButton, setOnFormSubmit };
