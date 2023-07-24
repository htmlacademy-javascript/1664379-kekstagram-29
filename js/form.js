import { isEscapeKey } from './util.js';
import {isTextFieldFocused, pristine} from './form-validate.js';
const form = document.querySelector('.img-upload__form');//форма загрузки изображения
const imgUploadOverlay = form.querySelector('.img-upload__overlay');//удалить hidden. для body добавить modal-open
const formCancelButton = form.querySelector('.img-upload__cancel');
const body = document.querySelector('body');

const closeModal = () => {
  form.reset();
  //resetScale;
  //resetEffect;
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const onDocumentKeydownEscape = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
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
