const createRandomInteger = (min, max) => {
  const result = Math.random() * (max - min) + min;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[createRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

export {createRandomInteger, getRandomArrayElement, isEscapeKey, isEnterKey};
