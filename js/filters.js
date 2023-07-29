import { renderThumbnails } from './thumbnail.js';
import { debounce } from './util.js';

const imgFilters = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');
const filterButtons = document.querySelectorAll('.img-filters__button');

const RANDOM_PICTURES_COUNT = 10;
const TIMEOUT = 500;

const filterPictures = (pictures, sortButton) => {

  if (sortButton === defaultFilter) {
    return pictures;
  }

  if (sortButton === randomFilter) {
    return pictures.slice().sort(() => Math.random() - 0.5).slice(0, RANDOM_PICTURES_COUNT);
  }

  if (sortButton === discussedFilter) {
    return pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
  }
};

const removePictures = () =>
  document.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());

const changeFilter = (evt) => {
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  const filterButton = evt.target;
  filterButton.classList.add('img-filters__button--active');
};

const onFilterClick = () => filterForm.addEventListener('click', (evt) => changeFilter(evt));

const renderFilter = (pictures) => {
  const filterButton = document.querySelector('.img-filters__button--active');
  removePictures();
  renderThumbnails(filterPictures(pictures, filterButton));
};

const setDebouncedFilter = (pictures) => {
  filterForm.addEventListener('click', debounce(() => {
    renderFilter(pictures);
  }, TIMEOUT));
};

const showFilters = () => imgFilters.classList.remove('img-filters--inactive');

export { setDebouncedFilter, showFilters, onFilterClick };
