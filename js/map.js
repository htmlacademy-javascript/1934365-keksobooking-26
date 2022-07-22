import {similarAdds} from './cards.js';
import {setSliderValue} from './slider.js';
import {onHousingTypeElementChange} from './validate-form.js';
import {adFormElement, mapFiltersElement} from './form.js';
import { resetPhotos } from './pictures.js';
const START_COORDINATE = {
  lat: 35.68948,
  lng: 139.69170,
};
const ZOOM_MAP = 13;

let map = null;
let markerGroup = null;
let startOffers = null;
const addressElement = document.querySelector('#address');
const resetElement = document.querySelector('.ad-form__reset');

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
  addressElement.value = `${START_COORDINATE.lat.toFixed(5)}, ${START_COORDINATE.lng.toFixed(5)}`;
};

// getAddressDefault();

// Создание слоя с группой меток

const createSecondaryMarkers = (point) => {
  const marker = L.marker(point.location,
    {
      icon: secondaryIcon,
    },
  );
  marker.addTo(markerGroup).bindPopup(similarAdds(point));
  return marker;
};

const renderMarkers = (offers) => {
  map.closePopup();
  markerGroup.clearLayers();
  offers.forEach(createSecondaryMarkers);
};

function activateMap(onLoad, offers) {
  startOffers = offers;
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

  renderMarkers(offers.slice(0, 10));
  // Получение координат при перемещении метки и запись их в поле адрес
  mainPinMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    addressElement.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
  });
}

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
  renderMarkers(startOffers.slice(0, 10));
  mapFiltersElement.reset();
  resetPhotos();
};

// Кнопка очистки
const onButtonResetClick = () => {
  resetElement.addEventListener('click', () => {
    resetForm(adFormElement);
  });
};

onButtonResetClick();

export {activateMap,
  resetForm,
  renderMarkers};

