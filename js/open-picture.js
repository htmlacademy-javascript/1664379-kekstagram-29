import { isEscapeKey, isEnterKey } from './util.js';

const COMMENTS_IN_SECTION = 5;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture'); //окно большой картинки
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel'); //кнопка закрытия окна с картинкой
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const socialCommentList = bigPicture.querySelector('.social__comments');

socialCommentList.innerHTML = '';
let commentsShown = 0;
let comments = [];

///функция закрытия картинки нажатием ESCAPE на DOCUMENT
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
};
//обработчик на документе закрытие картинки нажатием клавиши ESCAPE УДАЛИТЬ!!!
document.addEventListener('keydown', onDocumentKeydown);

//функция зактытия картинки
function closePicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);//удаление обработчика на документе
  commentsShown = 0;
  socialCommentList.innerHTML = '';
}

//закрытие картинки нажатием на кнопку
bigPictureCancel.addEventListener('click', () => {
  closePicture();
});
//закрытие картинки нажатием ENTER на кнопке закрытия
bigPictureCancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closePicture();
  }
});

//функция отрисовка большой картинки
const renderPhotoDetails = ({ url, likes, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
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

const renderComments = (items) => {
  commentsShown += COMMENTS_IN_SECTION;
  if (comments.length <= commentsShown) {
    commentsLoader.classList.add('hidden');
    commentsShown = items.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }
  socialCommentList.append(fragment);
  commentCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const onCommentsLoaderClick = function () {
  socialCommentList.innerHTML = '';
  renderComments(comments);

};

//закрытие картинки кликом мимо картинки
document.addEventListener('click', (evt) => {
  if (evt.target === bigPicture) {
    closePicture();
  }
});

//функция открытия картинки
const openPicture = (data) => {
  comments = data.comments;
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('modal-open');

  renderPhotoDetails(data);
  renderComments(data.comments);

  commentsLoader.addEventListener('click', onCommentsLoaderClick);

};

export { bigPicture, openPicture, closePicture };
