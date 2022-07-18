import './cards.js';
import './validate-form.js';
import './slider.js';
import {createAdds} from './data.js';
import {makeFormEnabled, makeFormDisabled} from './form.js';
import { activateMap } from './map.js';

makeFormDisabled();

// Присваиваем переменной значение функции по созданию массива с объектами
const generatedOffers = createAdds();
activateMap(makeFormEnabled, generatedOffers);
