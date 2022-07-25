import {onSubmitSend} from './api.js';
import {resetForm} from './map.js';
import {adFormElement} from './form.js';
import { updateSliderOptions } from './slider.js';
import {displayModalSuccess, displayModalError} from './modal-window.js';

const MIN_PRICE_OF_HOUSE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000
};

const ROOM_CAPACITY = {
  1: ['для 1 гостя'],
  2: ['для 2 гостей', 'для 1 гостя'],
  3: ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  100: ['не для гостей']
};

const roomNumberListElement = adFormElement.querySelector('#room_number');
const capacityListElement = adFormElement.querySelector('#capacity');
const typeOfHouseOptionElement = adFormElement.querySelector('[name="type"]');
const pricePerNightInputElement = adFormElement.querySelector('[name="price"]');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
const submitButton = adFormElement.querySelector('.ad-form__submit');

const pristine = new Pristine(adFormElement, {
  classTo: 'form-group',
  errorTextParent: 'form-group',
  errorTextTag: 'fieldset',
  errorTextClass: 'form__error'
});

const validatePriceOfType = () => pricePerNightInputElement.value >= MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value];

const getPriceErrorMessage = () => {
  if (pricePerNightInputElement.value <= MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value]) {
    return `минимальная цена ${MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value]}`;
  }
};

const getRoomCapacity = () => {
  if (capacityListElement.value === '0') {
    return 'не для гостей';
  }
  else if (capacityListElement.value === '1') {
    return 'для 1 гостя';
  }
  else {
    return `для ${capacityListElement.value} гостей`;
  }
};

const validateRoomNumber = () => ROOM_CAPACITY[roomNumberListElement.value].includes(getRoomCapacity(capacityListElement.value));

const getRoomErrorMessage = () => {
  if (roomNumberListElement.value === '1') {
    return `${roomNumberListElement.value} комната не подходит для ${capacityListElement.value} гостей`;
  }
  else if (roomNumberListElement.value === '100') {
    return `${roomNumberListElement.value} комнат не подходит для ${capacityListElement.value} ${capacityListElement.value === '1' ? 'гостя' : 'гостей'}`;
  }
  else {
    return `${roomNumberListElement.value} комнаты не подходят для ${capacityListElement.value} ${capacityListElement.value === '1' ? 'гостя' : 'гостей'}`;
  }
};

const onHousingTypeElementChange = () => {
  pricePerNightInputElement.min = MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value];
  pricePerNightInputElement.placeholder = `от ${MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value]}`;
  updateSliderOptions(MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value]);
  pristine.validate(typeOfHouseOptionElement);
};

const onTimeInElementChange = () => {
  timeOutElement.value = timeInElement.value;
};

const onTimeOutElementChange = () => {
  timeInElement.value = timeOutElement.value;
};

// Блокирует кнопку при отправке формы
const blockSubmitButton = () => {
  submitButton.setAttribute('disabled', 'disabled');
  submitButton.textContent = 'Отправляю...';
};

// Разблокирует кнопку
const unblockSubmitButton = () => {
  submitButton.removeAttribute('disabled', 'disabled');
  submitButton.textContent = 'Опубликовать';
};

const onSubmitSendSuccess = () => {
  // показывает сообщение об успешной отправке формы
  displayModalSuccess();
  // разблокировка кнопки отправить
  unblockSubmitButton();
  // очищает форму
  resetForm(adFormElement);
};

const onSubmitSendError = () => {
  displayModalError();
  unblockSubmitButton();
};

const onAdFormElementSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    onSubmitSend(onSubmitSendSuccess, onSubmitSendError, new FormData(evt.target));
  }
};

const activateFormValidation = () => {
  pristine.addValidator(roomNumberListElement, validateRoomNumber, getRoomErrorMessage);
  pristine.addValidator(capacityListElement, validateRoomNumber, getRoomErrorMessage);
  pristine.addValidator(pricePerNightInputElement, validatePriceOfType, getPriceErrorMessage);
  typeOfHouseOptionElement.addEventListener('change', onHousingTypeElementChange);
  timeInElement.addEventListener('change', onTimeInElementChange);
  timeOutElement.addEventListener('change', onTimeOutElementChange);

  adFormElement.addEventListener('submit', onAdFormElementSubmit);
};

export {activateFormValidation, onHousingTypeElementChange};
