const maxNumberOfPotos = 25;
const minLikes = 15;
const maxLikes = 200;

const descriptions = [
  'природа',
  'горы',
  'море',
  'закат',
  'красная жара',
  'лебединое озеро',
  'международный праздник'
];

const namesOfAuthors = [
  'Александр',
  'Иван',
  'Феликс',
  'Матвей',
  'Олег',
  'София',
  'Варвара',
  'Алиса'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const createRandomInteger = (min, max) => {
  const result = Math.random() * (max - min) + min;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[createRandomInteger(0, elements.length - 1)];

function createCommentId(min, max) {
  const previousId = [];

  return function () {
    let currentId = createRandomInteger(min, max);
    if (previousId.length >= (max - min + 1)) {
      return null;
    }
    while (previousId.includes(currentId)) {
      currentId = createRandomInteger(min, max);
    }
    previousId.push(currentId);
    return currentId;
  };
}

const getCommentId = createCommentId(0, 9999);

const createAvatar = function () {
  return function () {
    const avatarId = createRandomInteger(1, 6);
    return (`img/avatar-${ avatarId }.jpg`);
  };
};
const getAvatar = createAvatar();

const createMessage = function() {
  return function () {
    return getRandomArrayElement(messages);
  };
};

const getMessage = createMessage();

function getCommentData() {
  return {
    id: getCommentId(),
    avatar: getAvatar(),
    message: Array.from({ length: createRandomInteger(1, 5) }, getMessage),
    name: getRandomArrayElement(namesOfAuthors)
  };
}

const createId = function () {
  let lastId = 0;
  return function () {
    lastId += 1;
    return lastId;
  };
};
const getId = createId();

const createUrl = function () {
  let lastId = 0;
  return function () {
    lastId += 1;
    return `url:photos/${lastId}.jpg`;
  };
};

const getUrl = createUrl();

const getDescription = function () {
  return createRandomInteger(0, descriptions.length - 1);
};

function getPhotoData() {
  return {
    id: getId(),
    url: getUrl(),
    description: descriptions[getDescription()],
    likes: createRandomInteger(minLikes, maxLikes),
    comments: Array.from({ length: createRandomInteger(0, 10) }, getCommentData),
  };
}

const photos = [];

function getPhotos() {
  for (let i = 0; i < maxNumberOfPotos; i++){
    photos.push(getPhotoData());
  }
}

getPhotos();
