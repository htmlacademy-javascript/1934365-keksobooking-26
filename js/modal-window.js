let message;

const isPressedEscapeKey = (evt) => evt.key === 'Escape';

const onDocumentEscKeydown = (evt) => {
  if (isPressedEscapeKey(evt)) {
    evt.preventDefault();
    onDocumentClick();
  }
};

function onDocumentClick() {
  document.querySelector('.modal').remove();
  document.removeEventListener('keydown', onDocumentEscKeydown);
  document.removeEventListener('click', onDocumentClick);
}

const showModal = () => {
  document.body.append(message);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
};

const displayModalSuccess = () => {
  message = document.querySelector('#success').content.cloneNode(true);
  showModal();
};

const displayModalError = () => {
  message = document.querySelector('#error').content.cloneNode(true);
  showModal();
};

export {displayModalSuccess, displayModalError};
