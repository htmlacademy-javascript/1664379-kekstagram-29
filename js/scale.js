const STEP = 25;
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
////

const decreaseScale = () => {
  if (scaleControlValue.value === '25%') {
    scaleControlValue.value = '25%';
  } else {
    let scale = parseInt(scaleControlValue.value, 10);
    scale -= STEP;
    scaleControlValue.value = `${scale}%`;
    imgPreview.style.transform = `scale(${scale / 100})`;
  }
};

const increaseScale = () => {
  if (scaleControlValue.value === '100%') {
    scaleControlValue.value = '100%';
  } else {
    let scale = parseInt(scaleControlValue.value, 10);
    scale += STEP;
    scaleControlValue.value = `${scale}%`;
    imgPreview.style.transform = `scale(${scale / 100})`;
  }
};


const onScaleControlBiggerClick = () => {
  scaleControlBigger.addEventListener('click', increaseScale);
};
const onScaleControlSmallerClick = () => {
  scaleControlSmaller.addEventListener('click', decreaseScale);
};

export { resetScale, onScaleControlBiggerClick, onScaleControlSmallerClick };
