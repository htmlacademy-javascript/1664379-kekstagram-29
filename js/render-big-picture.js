import { isEscapeKey, isEnterKey } from './util.js'; //почему недостаточно импортировать только в main.js?
import { thumbnailsList } from './thumbnail.js'; //почему недостаточно импортировать только в main.js?

const bigPicture = document.querySelector('.big-picture'); //окно большой картинки
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel'); //кнопка закрытия окна с картинкой


//функция удаления hidden на окно большой картинки
const showBigPicture = () => {
  bigPicture.classList.remove('hidden');
};

//функция добавления hidden на окно большой картинки
const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
};

//открытие большой картинки
thumbnailsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    showBigPicture();
  }
});

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

//закрытие картинки нажатием клавиши ESCAPE
document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    hideBigPicture();
  }
});


