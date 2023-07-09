/*
Нужно:
- Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.
- Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
- Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.
- Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

  <li class="social__comment">
    <img
        class="social__picture"
        src="{{аватар}}"
        alt="{{имя комментатора}}"
        width="35" height="35">
    <p class="social__text">{{текст комментария}}</p>
</li>
- Описание фотографии description вставьте строкой в блок .social__caption.
*/
import { thumbnailsList } from './thumbnail.js';
import {bigPicture, bigPicturImg} from './open-picture.js';
import {getPhotos} from './data.js';

/*
thumbnailsList.addEventListener('click', () => {
  bigPicturImg.src = 'cdzc';
});
*/