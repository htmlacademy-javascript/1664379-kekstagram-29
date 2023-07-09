import { allPhotos } from './data.js';
import { isEscapeKey, isEnterKey } from './util.js'; //1. почему недостаточно импортировать только в main.js?

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture'); //окно большой картинки
const pictureCancelButton = bigPicture.querySelector('.big-picture__cancel'); //кнопка закрытия окна с картинкой
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

//функция закрытия картинки нажатием ESCAPE на DOCUMENT
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
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


const renderPhotoDetails = ({ url, likes, comments, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments;//поле пока скрыто

};
///СОЗНАНИЕ КОММЕНТАРИЕВ
/*
const createComment = ({ comments, description, likes, url, id }) => {
  const thumbnail = thumbnailsTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};
*/
/////
const renderComments = (comments) => {
  const socialCommentList = bigPicture.querySelector('.social__comments').innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((element) => {
    const comment = createComment(element);
    fragment.append(comment);
  });
};



//функция открытия картинки
const openPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('modal-open');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  //строки из ретро
  renderPhotoDetails(data);
  renderComments(data.comments);
};


console.log(allPhotos);


export { bigPicture, openPicture, closePicture };
