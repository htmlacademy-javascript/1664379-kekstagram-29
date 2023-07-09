import { isEscapeKey, isEnterKey } from './util.js'; //1. почему недостаточно импортировать только в main.js?

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture'); //окно большой картинки
const pictureCancelButton = bigPicture.querySelector('.big-picture__cancel'); //кнопка закрытия окна с картинкой
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

//закрытие картинки нажатием ESCAPE на DOCUMENT
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

//функция открытия картинки
const openPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('modal-open');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

};

//функция зактытия картинки
const closePicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

//ОБРАБОТЧИК закрытие картинки нажатием на кнопку
pictureCancelButton.addEventListener('click', () => {
  closePicture();
});

//ОБРАБОТЧИК закрытие картинки нажатием клавиши ENTER на кнопке закрытия
pictureCancelButton.addEventListener('keydown', (event) => {
  if (isEnterKey(event)) {
    closePicture();
  }
});
//

export {bigPicture, openPicture, closePicture};
