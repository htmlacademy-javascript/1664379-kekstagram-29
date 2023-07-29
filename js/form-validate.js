const form = document.querySelector('.img-upload__form');//форма загрузки изображения
const textHashtags = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');
const MAX_HASHTAGS_COUNT = 5;
const VALID_SIMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const normalizeTags = (value) => value.trim().split(' ').filter((tag) => Boolean(tag.length));
const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SIMBOLS.test(tag));
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAGS_COUNT;
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(
  textHashtags,
  hasValidCount,
  'Хеш-тегов не должно быть больше 5',
  1,
  true
);

pristine.addValidator(
  textHashtags,
  hasValidTags,
  'Неверный хеш-тег',
  2,
  true
);

pristine.addValidator(
  textHashtags,
  hasUniqueTags,
  'Хеш-теги не должны повторяться',
  3,
  true
);

const isTextFieldFocused = () =>
  document.activeElement === textHashtags ||
  document.activeElement === textDescription;

export {isTextFieldFocused, pristine};
