const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const effectsItems = document.querySelectorAll('.effects__preview');

const fileChooser = document.querySelector('.img-upload__input[type=file]');
const preview = document.querySelector('.img-upload__preview img');

const setPreviewPictureListener = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(file);
      effectsItems.forEach((effectPreview) => {
        effectPreview.style.backgroundImage = `url('${preview.src}')`;
      });
    }
  });
};

export {setPreviewPictureListener};
