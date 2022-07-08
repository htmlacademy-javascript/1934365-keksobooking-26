const getFormDisabled = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');

  const fieldsetDisabled = adForm.querySelectorAll('fieldset');
  fieldsetDisabled.forEach((i) => i.setAttribute('disabled', 'disabled'));

  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.add('ad-form--disabled');

  const mapFilter = document.querySelectorAll('select');
  mapFilter.forEach((i) => i.setAttribute('disabled', 'disabled'));

  return getFormDisabled;
};

getFormDisabled();
