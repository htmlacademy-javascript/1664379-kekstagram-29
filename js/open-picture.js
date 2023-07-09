import { isEscapeKey, isEnterKey } from './util.js'; //1. почему недостаточно импортировать только в main.js?
import { thumbnailsList } from './thumbnail.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture'); //окно большой картинки
const pictureCancelButton = bigPicture.querySelector('.big-picture__cancel'); //кнопка закрытия окна с картинкой
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPicturImg = bigPicture.querySelector('img');





//закрытие картинки нажатием ESCAPE на DOCUMENT
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};


//функция открытия картинки
const openPicture = () => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('modal-open');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};


//ОБРАБОТЧИК открытие большой картинки нажатием клавиши ENTER
thumbnailsList.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    if (evt.target.classList.contains('picture')) {
      openPicture();
    }
  }
});

//ОБРАБОТЧИК открытие большой картинки нажатием мышки
thumbnailsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    openPicture();
  }
});


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

/*
thumbnailsList.addEventListener('click', () => {
  bigPicturImg.src = 'cdzc';
});
*/
export {bigPicture, bigPicturImg};
