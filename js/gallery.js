import { openPicture } from './open-picture.js';
import { isEnterKey } from './util.js';
const thumbnailsList = document.querySelector('.pictures'); //section куда вставлять изображения
const imgFilters = document.querySelector('.img-filters');

//ОБРАБОТЧИК открытие большой картинки нажатием клавиши ENTER

thumbnailsList.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    if (evt.target.classList.contains('picture')) {
      openPicture();
    }
  }
});

//ОБРАБОТЧИК открытие большой картинки нажатием мышки

const renderGallery = (pictures) => {
  thumbnailsList.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const targetPhoto = pictures.find((item) =>
      item.id === +thumbnail.dataset.thumbnailId
    );
    openPicture(targetPhoto);
  });
  imgFilters.style.opacity = 1;
};

export {renderGallery};
