
const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const form = document.querySelector('.img-upload__form');//форма загрузки изображения
const scaleControlBigger = form.querySelector('.scale__control--bigger');//масштаб больше
const scaleControlSmaller = form.querySelector('.scale__control--smaller');//масштаб меньше
const scaleControlValue = form.querySelector('.scale__control--value');// окно отображения масштаба
const imgPreview = form.querySelector('.img-upload__preview img');//сама картинка
const effectsList = form.querySelector('.effects__list');//ul со списком эффектов

const effectLevelContainer = form.querySelector('.effect-level');//контейнер со слайдером интенсивности
const effectLevelSlider = form.querySelector('.effect-level__slider');//интенсивность эффекта

const effectLevelBar = form.querySelector('.effect-level__value');//input  в контейнере со слайдером


const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;


// создание слайдер с помощью библиотеки
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 0,
  },
  step: 0,
  start: 0,
  connect: 'lower'
});

//вспомогательные функции
const isDefault = () => chosenEffect === DEFAULT_EFFECT;
const showSlider = () => effectLevelContainer.classList.remove('hidden');
const hideSlider = () => effectLevelContainer.classList.add('hidden');

const updateSlider = () => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefault()){
    hideSlider();
  } else {
    showSlider();
  }
};

const onEffectsChange = (evt) => {
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }

  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imgPreview.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};
/*
///зачем еще раз создавать слайдер?!
const initSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: DEFAULT_EFFECT.min,
      max: DEFAULT_EFFECT.max,
    },
    start: DEFAULT_EFFECT.max,
    step: DEFAULT_EFFECT.step,
    connect: 'lower',
  });
};
*/

//НЕПОНЯТНАЯ ФУНКЦИЯ. ПОЧЕМУ В ТЕРНАРНЫЙ ОПЕРАТОР ПЕРЕДАНЫ НЕ ФУНКЦИИ?!
const onSliderUpdate = () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();//получаем значение ползунка

  imgPreview.style.filter = isDefault() //проверяем выбран фильтр по умолчанию или нет
    ? DEFAULT_EFFECT.style //если да, то получаем 'none'
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;//если нет, то получаем строку 'название выбранного эффекта + значение слайдера + ед. измерения'
  effectLevelBar.value = sliderValue;//в атрибут value тега input в fieldset слайдера вставляем значение ползунка (НУЖНО ДЛЯ ОТПРАВКИ НА СЕРВЕР?)
};

///РАЗОБРАТЬ ЭТИ ФУНКЦИИ////
const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

const setEffectsSlider = () => {
  initSlider();
  hideSlider();
  effectsElement.addEventListener('change', onEffectsChange);
  sliderElement.noUiSlider.on('update', onSliderUpdate);

};
////ПОДУМАТЬ КУДА ПОВЕСИТЬ ОБРАБОТЧКИКИ
effectsList.addEventListener('change', onEffectsChange);
form.addEventListener('click', onSliderUpdate);

///ОКОНЧАНИЕ ФАЙЛА
export {resetEffects, setEffectsSlider};
