import {createRandomInteger, getRandomArrayElement, isEscapeKey, isEnterKey} from './util.js';
import { allPhotos } from './data.js';
import {bigPicture} from './open-picture.js';
import {renderCallery} from'./gallery.js';
import {resetEffects, setEffectsSlider} from './effects.js';
import './form.js';
import './form-validate.js';



renderCallery(allPhotos);
setEffectsSlider();
