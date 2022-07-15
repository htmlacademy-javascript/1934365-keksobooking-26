const formElement = document.querySelector('.ad-form');
const roomNumberListElement = formElement.querySelector('#room_number');
const capacityListElement = formElement.querySelector('#capacity');
const housingTypeElement = formElement.querySelector('#type');
const userFieldPriceElement = formElement.querySelector('#price');
const timeInElement = formElement.querySelector('#timein');
const timeOutElement = formElement.querySelector('#timeout');

const pristine = new Pristine(formElement, {
  classTo: 'form-group',
  errorTextParent: 'form-group',
  errorTextTag: 'fieldset',
  errorTextClass: 'form__error'
});

const roomCapacity = {
  1: ['для 1 гостя'],
  2: ['для 2 гостей', 'для 1 гостя'],
  3: ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  100: ['не для гостей']
};

const minPriceForAccommodation = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
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

const validateRoomNumber = () => roomCapacity[roomNumberListElement.value].includes(getRoomCapacity(capacityListElement.value));

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
  userFieldPriceElement.placeholder = minPriceForAccommodation[housingTypeElement.value];
};

const onTimeInElementChange = () => {
  timeOutElement.value = timeInElement.value;
};

const onTimeOutElementChange = () => {
  timeInElement.value = timeOutElement.value;
};

pristine.addValidator(roomNumberListElement, validateRoomNumber, getRoomErrorMessage);
pristine.addValidator(capacityListElement, validateRoomNumber, getRoomErrorMessage);
housingTypeElement.addEventListener('change', onHousingTypeElementChange);
timeInElement.addEventListener('change', onTimeInElementChange);
timeOutElement.addEventListener('change', onTimeOutElementChange);

const onFormElementSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    evt.target.submit();
  }
};

formElement.addEventListener('submit', onFormElementSubmit);
