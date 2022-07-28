const sliderElement = document.querySelector('.ad-form__slider');
const inputValueElement = document.querySelector('#price');
const typesOfHousing = document.querySelector('#type');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000
  },
  start: 1000,
  step: 100,
  connect: 'lower',
  format: {
    to: (value) => {
      if (!Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: (value) => parseFloat(value),
  },
});

sliderElement.noUiSlider.on('slide', () => {
  inputValueElement.value = sliderElement.noUiSlider.get();
});

const setSliderValue = () => {
  typesOfHousing.addEventListener('change', (evt) => {
    sliderElement.noUiSlider.updateOptions(evt.target.value);
  });
};

const updateSliderOptions = (min) => {
  sliderElement.noUiSlider.set(min);
};

inputValueElement.addEventListener('input', () => {
  sliderElement.noUiSlider.set(inputValueElement.value);
});

const makeSliderDisabled = () => {
  sliderElement.setAttribute('disabled', 'disabled');
};

const makeSliderEnabled = () => {
  sliderElement.removeAttribute('disabled', 'disabled');
};

export {
  makeSliderDisabled,
  makeSliderEnabled,
  setSliderValue,
  updateSliderOptions
};
