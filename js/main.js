const CHECK_TIME = ['12:00', '13:00', '14:00'];
const DESCRIPTIONS = ['Уютный и небольшой отель, окутанный атмосферой непринужденности, в которой каждый гость почувствует себя комфортно',
  'Мини-отель бизнес класса, удачно сочетающий в себе лучшие традиции европейского сервиса и колорит старого Русского города',
  'Ультрасовременный 5-звездочный отель, специально созданный для взыскательных путешественников, которые ценят эксклюзивность, персонализированный сервис и превосходное качество'];
const MAX_GUESTS_VALUE = 10;
const MAX_ROOMS_VALUE = 6;
const MIN_LAT_VALUE = 35.65;
const MAX_LAT_VALUE = 35.7;
const MIN_LNG_VALUE = 139.7;
const MAX_LNG_VALUE = 139.8;
const MIN_PRICE_VALUE = 800;
const MAX_PRICE_VALUE = 20000;
const TITLES = ['Отель Платан', 'Авангард Отель', 'Бутик-отель Бристоль', 'Аэроотель', 'Хилтон Гарден Инн ', 'Отель Хэмингуэй', 'Гостиница Резидент', 'Римар Отель', 'Forum Plaza', 'Golden Tulip'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const SIMILAR_ADS_COUNT = 10;

const getRandomPositiveInteger = function (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomPositiveFloat = function (a, b, digits = 5) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
};

const getRandomArrayElement = function(elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
};

function createRandomAvatar (min, max) {
  const avatars = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (avatars.length >= (max - min + 1)) {

      return null;
    }
    while (avatars.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    avatars.push(currentValue);
    if ( currentValue < 10) {
      return `0${  currentValue}`;
    }
    return currentValue;
  };
}

const generateAvatar = createRandomAvatar(1, SIMILAR_ADS_COUNT);

const getRandomValue = function (value) {

  return Math.floor(Math.random() * value);
};

const getRandomArray = function (array) {
  const maxLength = array.length;
  const lengthOfNewArray = getRandomPositiveInteger(1, maxLength);
  const newArray = [];

  for (let i = 0; i <= lengthOfNewArray; i++) {
    const indexOfNewElement = getRandomPositiveInteger(0, lengthOfNewArray);
    const newElement = array[indexOfNewElement];

    if (!newArray.includes(newElement)) {
      newArray.push(newElement);
    }
  }
  return newArray;
};

const createAd = function () {
  const randomLat = getRandomPositiveFloat(MIN_LAT_VALUE, MAX_LAT_VALUE);
  const randomLng = getRandomPositiveFloat(MIN_LNG_VALUE, MAX_LNG_VALUE);

  return {
    author: {
      avatar: `img/avatars/user${  generateAvatar()  }.png`
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${randomLat  }, ${  randomLng}`,
      price: getRandomPositiveInteger(MIN_PRICE_VALUE, MAX_PRICE_VALUE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomValue(MAX_ROOMS_VALUE),
      guests: getRandomValue(MAX_GUESTS_VALUE),
      checkin: getRandomArrayElement(CHECK_TIME),
      checkout: getRandomArrayElement(CHECK_TIME),
      features: getRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS)
    },
    location: {
      lat: randomLat,
      lng: randomLng
    }
  };
};

Array.from({length: SIMILAR_ADS_COUNT}, createAd);


