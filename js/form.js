const addClass = (disabledItem) => {
  disabledItem.classList.add('ad-form--disabled');
};

const addAtribute = (disabledItem) => {
  disabledItem.forEach((element) => element.setAttribute('disabled', 'disabled'));
};

const toggleFormDisability = () => {
  const adFormElement = document.querySelector('.ad-form');
  const fieldsetElements = adFormElement.querySelectorAll('fieldset');
  const mapFiltersElement = document.querySelector('.map__filters');
  const mapFilterElements = document.querySelectorAll('select');

  const forms = [adFormElement, mapFiltersElement];
  forms.forEach((element) => addClass(element));

  const attributes = [fieldsetElements, mapFilterElements];
  attributes.forEach((element) => addAtribute(element));
};

export {toggleFormDisability};
