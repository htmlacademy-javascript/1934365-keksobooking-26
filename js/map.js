import { createSimilarAdds } from './cards.js';
import { setSliderValue } from './slider.js';
import { onHousingTypeElementChange } from './validate-form.js';
import { adFormElement, mapFiltersElement } from './form.js';
import { resetPhotos } from './pictures.js';
import { fetchOffers } from './api.js';
import { initFilters } from './filters.js';

const COUNT_OFFERS = 10;
const START_COORDINATE = {
  lat: 35.68948,
  lng: 139.69170,
};
const COUNT_AFTER_COMMA = 5;
const ZOOM_MAP = 13;

const addressElement = document.querySelector('#address');
const resetElement = document.querySelector('.ad-form__reset');

let map = null;
let markerGroup = null;
let startOffers = [];

const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const secondaryIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Создание главной метки
const mainPinMarker = L.marker(START_COORDINATE,
  {
    draggable: true,
    icon: mainIcon,
  });

const getAddressDefault = () => {
  addressElement.value = `${START_COORDINATE.lat.toFixed(COUNT_AFTER_COMMA)}, ${START_COORDINATE.lng.toFixed(COUNT_AFTER_COMMA)}`;
};

// Создание слоя с группой меток
const createSecondaryMarkers = (point) => {
  const marker = L.marker(point.location,
    {
      icon: secondaryIcon,
    },
  );
  marker.addTo(markerGroup).bindPopup(createSimilarAdds(point));
  return marker;
};

const renderMarkers = (offers) => {
  map.closePopup();
  markerGroup.clearLayers();
  offers.forEach(createSecondaryMarkers);
};

const onFetchOffersSuccessLoad = (offers) => {
  startOffers = offers;
  renderMarkers(offers.slice(0, COUNT_OFFERS));
  initFilters(offers);
};

const activateMap = (onLoad) => {
  // Создание карты
  map = L.map('map-canvas')
    .on('load', onLoad)
    .setView(START_COORDINATE, ZOOM_MAP);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  markerGroup = L.layerGroup().addTo(map);
  mainPinMarker.addTo(map);

  fetchOffers(onFetchOffersSuccessLoad) ;

  getAddressDefault();

  // Получение координат при перемещении метки и запись их в поле адрес
  mainPinMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    addressElement.value = `${coordinates.lat.toFixed(COUNT_AFTER_COMMA)}, ${coordinates.lng.toFixed(COUNT_AFTER_COMMA)}`;
  });
};

// Очистка формы
const resetForm = () => {
  adFormElement.reset();
  mainPinMarker.setLatLng(START_COORDINATE);
  map.setView(START_COORDINATE, ZOOM_MAP);
  setSliderValue();
  onHousingTypeElementChange();
  setTimeout(() => {
    getAddressDefault();
  }, 1);
  map.closePopup();
  renderMarkers(startOffers.slice(0, COUNT_OFFERS));
  mapFiltersElement.reset();
  resetPhotos();
};

// Кнопка очистки
resetElement.addEventListener('click', () => {
  resetForm(adFormElement);
});

export {activateMap,
  resetForm,
  renderMarkers,
  COUNT_OFFERS};

