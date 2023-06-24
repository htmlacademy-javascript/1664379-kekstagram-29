const maxNumberOfPotos = 25;

const namesOfAutors = [
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
    return `url:photos/${ lastId }.jpg`;
  };
};

const getUrl = createUrl();

function getPhotoData() {
  return {
    id: [getId()],
    url: [getUrl()],
    description: '',
    likes: '',
    comments: '',
  };
}

const photos = Array.from({length: maxNumberOfPotos}, getPhotoData);

