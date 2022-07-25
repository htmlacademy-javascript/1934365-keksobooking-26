import { onLoadMap, makeFormDisabled } from './form.js';
import { activateMap } from './map.js';
// import { activateFormValidation } from './validate-form.js';
import { initPhoto } from './pictures.js';

makeFormDisabled();

activateMap(onLoadMap);

// activateFormValidation();

initPhoto();
