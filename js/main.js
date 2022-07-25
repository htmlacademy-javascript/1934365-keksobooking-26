import { onLoadMap, makeFormDisabled } from './form.js';
// import { fetchOffers } from './api.js';
import { activateMap } from './map.js';
import { activateFormValidation } from './validate-form.js';
// import { initFilters } from './filters.js';
import { initPhoto } from './pictures.js';

makeFormDisabled();

activateMap(onLoadMap);

// fetchOffers((offers) => {
//   initFilters(offers);
// }
// );
activateFormValidation();

initPhoto();
