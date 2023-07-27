import {createRandomInteger, getRandomArrayElement} from './util.js';
const maxNumberOfPotos = 25;
const minLikes = 15;
const maxLikes = 200;
const maxComment = 30;

const descriptions = [];
const namesOfAuthors = [];
const messages = [];

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

function createAvatar () {
  return function () {
    const avatarId = createRandomInteger(1, 6);
    return (`img/avatar-${ avatarId }.svg`);
  };
}
const getAvatar = createAvatar();

function createMessage () {
  return function () {
    return getRandomArrayElement(messages);
  };
}
const getMessage = createMessage();

function getCommentData() {
  return {
    id: getCommentId(),
    avatar: getAvatar(),
    message: Array.from({ length: createRandomInteger(1, 3) }, getMessage),
    name: getRandomArrayElement(namesOfAuthors)
  };
}

function createId () {
  let lastId = 0;
  return function () {
    lastId += 1;
    return lastId;
  };
}
const getId = createId();

function createUrl () {
  let lastId = 0;
  return function () {
    lastId += 1;
    return `photos/${lastId}.jpg`;
  };
}
const getUrl = createUrl();

function getPhotoData() {
  return {
    id: getId(),
    url: getUrl(),
    description: descriptions[createRandomInteger(0, descriptions.length - 1)],
    likes: createRandomInteger(minLikes, maxLikes),
    comments: Array.from({ length: createRandomInteger(0, maxComment) }, getCommentData),
  };
}

function getPhotoElements() {
  const photos = [];
  for (let i = 0; i < maxNumberOfPotos; i++){
    photos.push(getPhotoData());
  }
  return photos;
}

const allPhotos = getPhotoElements();

export{allPhotos};

//создан массив с иконками изображений. переход в файл gallery
