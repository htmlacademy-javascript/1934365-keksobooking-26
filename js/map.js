import {similarAdds} from './cards.js';

const START_COORDINATE = {
  lat: 35.68948,
  lng: 139.69170,
};
const ZOOM_MAP = 10;
const addressElement = document.querySelector('#address');
// const resetElement = document.querySelector('.ad-form__reset');

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

const addressDefault = `${START_COORDINATE.lat.toFixed(5)}, ${START_COORDINATE.lng.toFixed(5)}`;
addressElement.value = addressDefault;

// Получение координат при перемещении метки и запись их в поле адрес
mainPinMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  addressElement.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
});

let map = null;

function activateMap(onLoad, offers) {
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

  mainPinMarker.addTo(map);

  // Добавление на карту второстепенных меток
  offers.forEach((point) => {
    const marker = L.marker(point.location,
      {
        icon: secondaryIcon,
      },
    );

    marker.addTo(map).bindPopup(similarAdds(point));
  });
}

export {activateMap};

