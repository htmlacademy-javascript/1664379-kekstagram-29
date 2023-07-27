import { showAlert } from './util.js';
import { renderThumbnails } from './thumbnail.js';
import { renderCallery } from './gallery.js';
import { setEffectsSlider } from './effects.js';
import { onScaleControlBiggerClick, onScaleControlSmallerClick } from './scale.js';
import { onFormValueChange } from './form.js';
import { getData, sendData } from './api.js';


try {
  const data = await getData();
  renderThumbnails(data);
  renderCallery(data);
} catch (err) {
  showAlert(err.message);
}

onFormValueChange();
setEffectsSlider();
onScaleControlBiggerClick();
onScaleControlSmallerClick();
/*
setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  } finally {
    unblockSubmitButton();
  }
});
*/