const thumbnailsTemplate = document.querySelector('#picture').content.querySelector('.picture'); //шаблон

const createThumbnail = ({ comments, description, likes, url, id }) => {
  const thumbnail = thumbnailsTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

const renderThumbnails = (pictures, conteiner) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });
  conteiner.append(fragment);
};

export{renderThumbnails};

//все готово для отрисовка иконок. переходим в файл gallery