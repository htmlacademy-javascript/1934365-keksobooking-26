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
          max: 3000,
        },
        step: 200,
      },
      flat: {
        range: {
          min: 1000,
          max: 10000
        },
        step: 1000,
      },
      hotel: {
        range: {
          min: 3000,
          max: 20000
        },
        step: 1000,
      },
      house: {
        range: {
          min: 5000,
          max: 50000
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

setSliderValue();

const makeSliderDisabled = () =>{
  sliderElement.setAttribute('disabled', true);
};

const makeSliderEnabled = () => {
  sliderElement.removeAttribute('disabled');
};
export {
  makeSliderDisabled,
  makeSliderEnabled,
  setSliderValue};
