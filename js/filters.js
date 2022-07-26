import { debounce } from './utils.js';
import { renderMarkers, COUNT_OFFERS } from './map.js';

const RERENDER_DELAY = 500;
const DEFAULT_VALUE = 'any';
const PriceRanges = {
  ANY: {
    minPrice: 0,
    maxPrice: 100000,
  },
  LOW: {
    minPrice: 0,
    maxPrice: 10000,
  },
  MIDDLE: {
    minPrice: 10001,
    maxPrice: 50000,
  },
  HIGH: {
    minPrice: 50001,
    maxPrice: 100000,
  },
};

const mapFiltersElement = document.querySelector('.map__filters');
const houseTypeSelect = mapFiltersElement.querySelector('#housing-type');
const roomsSelect = mapFiltersElement.querySelector('#housing-rooms');
const guestsSelect = mapFiltersElement.querySelector('#housing-guests');


const filterByHouseType = (type) => houseTypeSelect.value === type || houseTypeSelect.value === DEFAULT_VALUE;

const filterByPrice = (price) => {
  const priseSelect = mapFiltersElement.querySelector('#housing-price').value.toUpperCase();
  return price >= PriceRanges[priseSelect].minPrice && price <= PriceRanges[priseSelect].maxPrice;
};

const filterByRoomsCount = (roomsCount) => Number(roomsSelect.value) === roomsCount || roomsSelect.value === DEFAULT_VALUE;
const filterByGuestsCount = (guestsCount) => Number(guestsSelect.value) === guestsCount || guestsSelect.value === DEFAULT_VALUE;

const filterByFeatures = (features) => {
  const checkBoxFeatures = mapFiltersElement.querySelectorAll('.map__features :checked');
  if (checkBoxFeatures.length && features) {
    return Array.from(checkBoxFeatures).every((checkFeatures) => features.includes(checkFeatures.value));
  }
  return checkBoxFeatures.length === 0;
};

const filterOffers = (offers, rerenderMarkers) => {
  const filteredOffers = offers.filter(({ offer }) =>
    filterByHouseType(offer.type) &&
    filterByPrice(offer.price) &&
    filterByRoomsCount(offer.rooms) &&
    filterByGuestsCount(offer.guests) &&
    filterByFeatures(offer.features)
  );
  rerenderMarkers(filteredOffers.slice(0, COUNT_OFFERS));
};

const initFilters = (offers) => {
  const onMapFiltersElementChange = debounce(() => filterOffers(offers, renderMarkers), RERENDER_DELAY);
  mapFiltersElement.addEventListener('change', onMapFiltersElementChange);
};

export { initFilters };
