const STEP = 25;
const MIN_STEP = 25;
const MAX_STEP = 100;
const DEFAULT = 100;
let currentScale = DEFAULT;

const form = document.querySelector('.img-upload__form');//форма загрузки изображения
const scaleControlBigger = form.querySelector('.scale__control--bigger');//масштаб больше
const scaleControlSmaller = form.querySelector('.scale__control--smaller');//масштаб меньше
const scaleControlValue = form.querySelector('.scale__control--value');// окно отображения масштаба
const imgPreview = form.querySelector('.img-upload__preview img');//сама картинка

//сброс масштаба
const resetScale = () => {
  scaleControlValue.value = `${DEFAULT}%`;
  imgPreview.style.transform = `scale(${DEFAULT / 100})`;
};


//увеличение масштаба

const increaseScale = () => {
  scaleControlBigger.removeAttribute('disabled');
  if (scaleControlValue.value === '100%') {
    scaleControlBigger.setAttribute('disabled', true);
  } else {
    currentScale += STEP;
    scaleControlValue.value = `${currentScale}%`;
    imgPreview.style.transform = `scale(${currentScale / 100})`;
    scaleControlSmaller.removeAttribute('disabled');
  }
};

const decreaseScale = () => {
  scaleControlSmaller.removeAttribute('disabled');
  if (scaleControlValue.value === '25%') {
    scaleControlSmaller.setAttribute('disabled', true);
  } else {
    currentScale -= STEP;
    scaleControlValue.value = `${currentScale}%`;
    imgPreview.style.transform = `scale(${currentScale / 100})`;
    scaleControlBigger.removeAttribute('disabled');
  }
};

const onScaleControlBiggerClick = () => {
  scaleControlBigger.addEventListener('click', increaseScale);
};
const onScaleControlSmallerClick = () => {
  scaleControlSmaller.addEventListener('click', decreaseScale);
};

export { resetScale, onScaleControlBiggerClick, onScaleControlSmallerClick };

