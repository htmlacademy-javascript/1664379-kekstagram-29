import {createRandomInteger, getRandomArrayElement} from './util.js';
import {getPhotos} from './data.js';
import {renderThumbnails} from './thumbnail.js';

renderThumbnails(getPhotos());
