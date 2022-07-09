const toggleFormDisability = () => {
  const adFormElement = document.querySelector('.ad-form');
  const fieldsetElement = adFormElement.querySelectorAll('fieldset');
  const mapFiltersElement = document.querySelector('.map__filters');
  const mapFilterElement = document.querySelectorAll('select');

  const getDisabledForm = (disabledItem) => {
    disabledItem.classList.add('ad-form--disabled');
  };

  getDisabledForm(adFormElement);
  getDisabledForm(mapFiltersElement);

  const getDisabledElement = (disabledItem) => {
    disabledItem.forEach((item) => item.setAttribute('disabled', 'disabled'));
  };

  getDisabledElement(fieldsetElement);
  getDisabledElement(mapFilterElement);

  return toggleFormDisability;
};

export {toggleFormDisability};
