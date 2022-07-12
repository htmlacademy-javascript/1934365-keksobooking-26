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
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': ['не для гостей']
};

const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const validateRoomNumber = () => roomCapacity[roomNumberListElement.value].includes(capacityListElement.value);
const getRoomErrorMessage = () => `${roomNumberListElement.value} ${roomNumberListElement.value === '1 комната' ? 'не подходит' : 'не подходят'} ${capacityListElement.value}`;

pristine.addValidator(roomNumberListElement, validateRoomNumber, getRoomErrorMessage);
pristine.addValidator(capacityListElement, validateRoomNumber, getRoomErrorMessage);

housingTypeElement.addEventListener('change', () => {
  userFieldPriceElement.placeholder = minPrice[housingTypeElement.value];
});

timeInElement.addEventListener('change', () => (timeOutElement.value = timeInElement.value));
timeOutElement.addEventListener('change', () => (timeInElement.value = timeOutElement.value));

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  return isValid;
});
