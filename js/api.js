const URL_GET = 'https://26.javascript.pages.academy/keksobooking/data';
const URL_SEND = 'https://26.javascript.pages.academy/keksobooking';

const fetchOffers = (onLoad) => {
  fetch(URL_GET)
    .then((response) => response.json())
    .then(onLoad);
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
  }).catch(() => onError());
};

export {fetchOffers, onSubmitSend};
