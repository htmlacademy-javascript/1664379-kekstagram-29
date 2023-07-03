const createRandomInteger = (min, max) => {
  const result = Math.random() * (max - min) + min;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[createRandomInteger(0, elements.length - 1)];

export {createRandomInteger, getRandomArrayElement};
