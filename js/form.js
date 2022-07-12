const adFormElement = document.querySelector('.ad-form');
const fieldsetElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersElement = document.querySelector('.map__filters');
const mapFilterElements = document.querySelectorAll('select');
const forms = [adFormElement, mapFiltersElement];
const attributes = [fieldsetElements, mapFilterElements];

const addClass = (disabledItem) => {
  disabledItem.classList.add('ad-form--disabled');
};

const addAttribute = (disabledItem) => {
  disabledItem.forEach((element) => element.setAttribute('disabled', 'disabled'));
};

const makeFormDisabled = () => {
  forms.forEach((element) => addClass(element));
  attributes.forEach((element) => addAttribute(element));
};

const removeClass = (disabledItem) => {
  disabledItem.classList.remove('ad-form--disabled');
};

const removeAttribute = (disabledItem) => {
  disabledItem.forEach((element) => element.removeAttribute('disabled', 'disabled'));
};

const makeFormEnabled = () => {
  forms.forEach((element) => removeClass(element));
  attributes.forEach((element) => removeAttribute(element));
};

export {makeFormDisabled, makeFormEnabled};
