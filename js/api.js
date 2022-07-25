import { showAlert } from './utils.js';
import { addClassFiltersDisabled, mapFiltersElement } from './form.js';

const URL_GET = 'https://26.javascript.pages.academy/keksobooking/data';
const URL_SEND = 'https://26.javascript.pages.academy/keksobooking';

const fetchOffers = (onSuccessLoad) => {
  fetch(URL_GET)
    .then((response) => response.json())
    .then(onSuccessLoad)
    .catch(() => {
      showAlert('Ошибка при загрузке данных с сервера!');
      addClassFiltersDisabled(mapFiltersElement);
    });
};

const onSubmitSend = (onSuccess, onError, body) => {
  fetch(URL_SEND,
    {
      method: 'POST',
      body,
    }).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  }).catch((error) => onError(error));
};

export {fetchOffers, onSubmitSend};
