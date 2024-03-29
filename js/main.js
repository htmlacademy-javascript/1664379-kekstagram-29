import { showAlert } from './util.js';
import { renderThumbnails } from './thumbnail.js';
import { renderGallery } from './gallery.js';
import { setEffectsSlider } from './effects.js';
import { onScaleControlBiggerClick, onScaleControlSmallerClick } from './scale.js';
import { closeModal, onFormValueChange, setOnFormSubmit, unblockSubmitButton, blockSubmitButton } from './form.js';
import { showErrorMessage, showSuccessMessage } from './form-message.js';
import { getData, sendData } from './api.js';
import { showFilters, setDebouncedFilter, onFilterClick } from './filters.js';
import { setPreviewPictureListener } from './upload.js';


onFormValueChange();
setEffectsSlider();
onScaleControlBiggerClick();
onScaleControlSmallerClick();
setPreviewPictureListener();


setOnFormSubmit(async (data) => {
  try {
    blockSubmitButton();
    await sendData(data);
    closeModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  } finally {
    unblockSubmitButton();
  }
});

try {
  const data = await getData();
  renderThumbnails(data);
  renderGallery(data);
  showFilters();
  onFilterClick();
  setDebouncedFilter(data);
} catch (err) {
  showAlert(err.message);
}


