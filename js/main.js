import { makeFormEnabled, makeFormDisabled } from './form.js';
import { activateMap } from './map.js';
import { fetchOffers } from './api.js';
import { activateFormValidation } from './validate-form.js';
import { displayModalError, displayModalSuccess } from './modal-window.js';
import { initFilters } from './filters.js';
import { initPhoto } from './pictures.js';

makeFormDisabled();

fetchOffers((offers) => {
  initFilters(offers);
  activateMap(makeFormEnabled, offers);
}
);
activateFormValidation(displayModalSuccess, displayModalError);

initPhoto();
