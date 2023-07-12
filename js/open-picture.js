import { isEscapeKey, isEnterKey } from './util.js';
import './thumbnail.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture'); //окно большой картинки
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel'); //кнопка закрытия окна с картинкой
const socialCommentCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const COMMENTS_IN_SECTION = 5;
let commentsSwon = 0;

//функция добавления hidden на окно большой картинки
const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

//закрытие картинки нажатием на кнопку
bigPictureCancel.addEventListener('click', () => {
  hideBigPicture();
});

//закрытие картинки нажатием клавиши ENTER на кнопке закрытия
bigPictureCancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    hideBigPicture();
  }
});

//функция закрытия картинки нажатием ESCAPE на DOCUMENT
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
};

//закрытие картинки нажатием клавиши ESCAPE
document.addEventListener('keydown', onDocumentKeydown);

//функция зактытия картинки
const closePicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsSwon = 0;
};

//функция отрисовка большой картинки
const renderPhotoDetails = ({ url, likes, comments, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments;//поле пока скрыто
};

///функция создания комменатрия по шаблону
const createComment = ({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

//ДОБАВЛЕНИЕ КОММЕНТАРИЯ К ОКНУ БОЛЬШОЙ КАРТИНКИ
////////////////////////////////////////
const socialCommentList = bigPicture.querySelector('.social__comments');
socialCommentList.innerHTML = '';

const renderComments = (comments) => {

  commentsSwon += COMMENTS_IN_SECTION;
  console.log(commentsSwon);
  if (comments.length <= commentsSwon) {
    commentsLoader.classList.add('hidden');
    commentsSwon = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }


  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsSwon; i++) {
    const comment = createComment(comments[i]);
    console.log(comments[i]);
    fragment.append(comment);
  }

  socialCommentCount.textContent = comments.length;
  socialCommentList.append(fragment);

};

//закрытие картинки кликом мимо картинки
document.addEventListener('click', (evt) => {
  if (evt.target === bigPicture) {
    closePicture();
  }
});
/////////////////////////////////////////////
//функция открытия картинки
const openPicture = (data) => {

  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('modal-open');


  renderPhotoDetails(data);
  renderComments(data.comments);
};

commentsLoader.addEventListener('click', renderComments); //ЛОМАЕТ ДЕСТРУКТУРИЗАЦИЮ

export { bigPicture, openPicture, closePicture };
