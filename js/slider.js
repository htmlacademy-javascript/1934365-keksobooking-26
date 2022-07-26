const sliderElement = document.querySelector('.ad-form__slider');
const inputValueElement = document.querySelector('#price');
const typesOfHousing = document.querySelector('#type');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 10000
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

sliderElement.noUiSlider.on('update', () => {
  inputValueElement.value = sliderElement.noUiSlider.get();
});

const setSliderValue = () =>{
  typesOfHousing.addEventListener('change', (evt) => {
    const config = {
      bungalow: {
        range: {
          min: 0,
          max: 10000,
        },
        step: 200,
      },
      flat: {
        range: {
          min: 1000,
          max: 100000
        },
        step: 1000,
      },
      hotel: {
        range: {
          min: 3000,
          max: 100000
        },
        step: 1000,
      },
      house: {
        range: {
          min: 5000,
          max: 100000
        },
        step: 2000,
      },
      palace: {
        range: {
          min: 10000,
          max: 100000
        },
        step: 5000,
      }
    };

    sliderElement.noUiSlider.updateOptions(config[evt.target.value]);
  });
};

const updateSliderOptions = (min) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: Number(min),
      max: 100000,
    },
    step: 1
  });
  sliderElement.noUiSlider.set(min);
};

const makeSliderDisabled = () =>{
  sliderElement.setAttribute('disabled', true);
};

const makeSliderEnabled = () => {
  sliderElement.removeAttribute('disabled');
};

export {
  makeSliderDisabled,
  makeSliderEnabled,
  setSliderValue,
  updateSliderOptions
};
