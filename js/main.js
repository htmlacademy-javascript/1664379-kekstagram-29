//ИСХОДНЫЙ ДАННЫЕ

//максимальное число фотогафий
const maxNumberOfPotos = 25;

//массив с описанием фотографий
const descriptions = [
  'природа',
  'горы',
  'море',
  'закат',
  'красная жара',
  'лебединое озеро',
  'международный праздник'
];

//массив с именами авторов комментарев
const namesOfAuthors = [
  'Александр',
  'Иван',
  'Феликс',
  'Матвей',
  'Олег',
  'София',
  'Варвара',
  'Алиса',
  'Виктория',
  'Полина',
  'Ева',
  'Данила',
  'Павел',
  'Надежда',
  'Анна',
  'Людмила',
  'Виктор',
  'Алексей',
  'Степан',
  'Николай',
  'Ирина',
  'Григорий',
  'Лариса',
  'Галина',
  'Федор'
];

//массив с сообщениями
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

//ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

//функиця получения рандомного числа в диапазоне
const createRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

///выбор рандомного значения из массива
const getRandomArrayElement = (elements) => elements[createRandomInteger(0, elements.length - 1)];

//РЕШЕНИЕ ЗАДАЧИ

//1. СОЗДАНИЕ ДАННЫХ КОММЕНТАРИЕВ

//создание id комментария (любое неповторяющееся число в диапазоне 0 - 9999)
function createCommentId(min, max) {
  const previousId = [];

  return function () {
    let currentId = createRandomInteger(min, max);
    if (previousId.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
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

//выбор случайного аватара
const createAvatar = function () {
  return function () {
    const avatarId = createRandomInteger(1, 6);
    return (`img/avatar-${ avatarId }.jpg`);
  };
};
const getAvatar = createAvatar();

//создание объекта комментария
function getCommentData() {
  return {
    id: [getCommentId()],
    avatar: [getAvatar()],
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(namesOfAuthors)
  };
}

//получение массива объектов комментариев
const comments = Array.from({ length: maxNumberOfPotos }, getCommentData);

//2. СОЗДАНИЕ ДАННЫХ ФОТОГРАФИЙ

//функция получения id фотогафии
const createId = function () {
  let lastId = 0;
  return function () {
    lastId += 1;
    return lastId;
  };
};
const getId = createId();

//функция получения url фотографии
const createUrl = function () {
  let lastId = 0;
  return function () {
    lastId += 1;
    return `url:photos/${lastId}.jpg`;
  };
};

const getUrl = createUrl();

//получение количества лайков
const getLikes = function () {
  return createRandomInteger(15, 200);
};

//получение случайного описания из массива
const getDescription = function () {
  return createRandomInteger(0, descriptions.length - 1);
};

//создание объекта данных фотографии
function getPhotoData() {
  return {
    id: [getId()],
    url: [getUrl()],
    description: descriptions[getDescription()],
    likes: [getLikes()],
    comments: getRandomArrayElement(comments),
  };
}

//получение массива объектов данных фотографий
const photos = Array.from({ length: maxNumberOfPotos }, getPhotoData);
