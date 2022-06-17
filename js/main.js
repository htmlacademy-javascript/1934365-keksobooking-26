function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 5) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
}

function getRoomsValue () {
  const maxRoomsValue = 6;

  return Math.floor(Math.random() * Math.abs(maxRoomsValue));
}

function getGuestsValue () {
  const maxRoomsValue = 6;

  return Math.floor(Math.random() * Math.abs(maxRoomsValue));
}

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKTIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


const createAds = function () {
  const randomTypeIndex = getRandomPositiveInteger(0, TYPES.length - 1);
  const randomCheckIndex = getRandomPositiveInteger(0, CHECKTIME.length - 1);
  const randomLat = getRandomPositiveFloat(35.65, 35.7);
  const randomLng = getRandomPositiveFloat(139.7, 139.8);

  return {
    author: {
      avatar: ''
    },
    offer: {
      title: '',
      adress: `${randomLat  }, ${  randomLng}`,
      price: '',
      type: TYPES[randomTypeIndex],
      rooms: getRoomsValue(),
      guests: getGuestsValue(),
      checkin: CHECKTIME[randomCheckIndex],
      checkout: CHECKTIME[randomCheckIndex],
      features: [],
      description: '',
      photos: []
    },
    location: {
      lat: randomLat,
      lng: randomLng
    }
  };
};
