import { isEscapeKey, isEnterKey } from './util.js'; //1. почему недостаточно импортировать только в main.js?

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture'); //окно большой картинки
const pictureCancelButton = bigPicture.querySelector('.big-picture__cancel'); //кнопка закрытия окна с картинкой
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

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
  //console.log();
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

//ДОБАВЛЕНИЕ КОММЕНТАРИЯ К ОКНУ БОЛЬШОЙ КАРТИНКИ

const renderComments = (comments) => {
  const socialCommentList = bigPicture.querySelector('.social__comments');
  socialCommentList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((element) => {
    const commentElement = createComment(element);
    fragment.append(commentElement);
  });
  socialCommentList.append(fragment);
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


export { bigPicture, openPicture, closePicture };
