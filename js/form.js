import {makeSliderDisabled, makeSliderEnabled} from './slider.js';

const adFormElement = document.querySelector('.ad-form');
const fieldsetElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersElement = document.querySelector('.map__filters');
const mapFilterElements = document.querySelectorAll('select');
const forms = [adFormElement, mapFiltersElement];
const attributes = [fieldsetElements, mapFilterElements];

const addClassFiltersDisabled = (disabledItem) => {
  disabledItem.classList.add('ad-form--disabled');
};

const addAttribute = (disabledItem) => {
  disabledItem.forEach((element) => element.setAttribute('disabled', 'disabled'));
};

const makeFormDisabled = () => {
  forms.forEach((element) => addClassFiltersDisabled(element));
  attributes.forEach((element) => addAttribute(element));
  makeSliderDisabled();
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
  makeSliderEnabled();
};

const onLoadMap = () => {
  makeFormEnabled();
};

export {onLoadMap,
  makeFormDisabled,
  adFormElement,
  mapFiltersElement,
  addClassFiltersDisabled
};
