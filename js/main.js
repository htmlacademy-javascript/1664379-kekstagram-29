import {createRandomInteger, getRandomArrayElement, isEscapeKey, isEnterKey} from './util.js';
import {getPhotos} from './data.js';
import {renderThumbnails, thumbnailsList} from './thumbnail.js';
import {bigPicture} from './open-picture.js';
import './render-picture.js';

renderThumbnails(getPhotos());
