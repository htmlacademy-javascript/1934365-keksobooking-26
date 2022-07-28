const ESCAPE_KEY = 'Escape';
let message;

const isPressedEscapeKey = (evt) => evt.key === ESCAPE_KEY;

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

const displayModalError = (error) => {
  message = document.querySelector('#error').content.cloneNode(true);
  showModal(error);
};

export {displayModalSuccess, displayModalError};
