const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const photoHeaderElement = document.querySelector('.ad-form-header__input');
const avatarElement = document.querySelector('.ad-form-header__picture');
const photoFormElement = document.querySelector('.ad-form__input');
const pictureFormElement = document.querySelector('.ad-form__photo');

const uploadAvatarPhoto = () => {
  const fileAvatar = photoHeaderElement.files[0];
  const fileName = fileAvatar.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarElement.src = URL.createObjectURL(fileAvatar);
  }
};

const uploadHousePhoto = () => {
  const fileHouse = photoFormElement.files[0];
  const fileName = fileHouse.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const photo = document.createElement('img');
    photo.style.width = '70px';
    photo.style.height = '70px';
    photo.src = URL.createObjectURL(fileHouse);
    pictureFormElement.append(photo);
  }
};

const initPhoto = () => {
  photoHeaderElement.addEventListener('change', uploadAvatarPhoto);
  photoFormElement.addEventListener('change', uploadHousePhoto);
};

const resetPhotos = () => {
  avatarElement.src = 'img/muffin-grey.svg';
  pictureFormElement.textContent = '';
};

export {initPhoto, resetPhotos};
