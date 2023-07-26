import { allPhotos } from './data.js';
import {renderCallery} from'./gallery.js';
import {setEffectsSlider} from './effects.js';
import {onScaleControlBiggerClick, onScaleControlSmallerClick} from'./scale.js';
import './form.js';
import './form-validate.js';

renderCallery(allPhotos);
setEffectsSlider();
onScaleControlBiggerClick();
onScaleControlSmallerClick();
