import {makeFormEnabled, makeFormDisabled} from './form.js';
import {activateMap} from './map.js';
import {fetchOffers, onSubmitSend} from './api.js';
import './cards.js';
import './validate-form.js';
import './slider.js';

makeFormDisabled();

fetchOffers((offers) => activateMap(makeFormEnabled, offers));

onSubmitSend();
