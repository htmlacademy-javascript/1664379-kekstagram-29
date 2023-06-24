const maxNumberOfPotos = 25;

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

