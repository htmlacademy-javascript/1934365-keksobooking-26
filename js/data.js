import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomValue, getRandomArray} from './util.js';

const CHECK_TIME = ['12:00', '13:00', '14:00'];
const DESCRIPTIONS = ['Уютный и небольшой отель, окутанный атмосферой непринужденности, в которой каждый гость почувствует себя комфортно',
  'Мини-отель бизнес класса, удачно сочетающий в себе лучшие традиции европейского сервиса и колорит старого Русского города',
  'Ультрасовременный 5-звездочный отель, специально созданный для взыскательных путешественников, которые ценят эксклюзивность, персонализированный сервис и превосходное качество'];
const MAX_GUESTS_VALUE = 10;
const MIN_ROOMS_VALUE = 1;
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

const createAdds = function () {
  const adds = [];
  for (let i = 0; i <= SIMILAR_ADS_COUNT; i++) {
    const randomLat = getRandomPositiveFloat(MIN_LAT_VALUE, MAX_LAT_VALUE);
    const randomLng = getRandomPositiveFloat(MIN_LNG_VALUE, MAX_LNG_VALUE);
    const avatarNumber = i < 10 ? `0${i}` : i;
    adds[i] = {
      author: {
        avatar: `./img/avatars/user${avatarNumber}.png`
      },
      offer: {
        title: getRandomArrayElement(TITLES),
        address: `${randomLat}, ${randomLng}`,
        price: getRandomPositiveInteger(MIN_PRICE_VALUE, MAX_PRICE_VALUE),
        type: getRandomArrayElement(TYPES),
        rooms: getRandomPositiveInteger(MIN_ROOMS_VALUE, MAX_ROOMS_VALUE),
        guests: getRandomValue(MAX_GUESTS_VALUE),
        checkin: getRandomArrayElement(CHECK_TIME),
        checkout: getRandomArrayElement(CHECK_TIME),
        description: getRandomArrayElement(DESCRIPTIONS),
        features: getRandomArray(FEATURES),
        photos: getRandomArray(PHOTOS)
      },
      location: {
        lat: randomLat,
        lng: randomLng
      }
    };
  }
  return adds;
};

export {createAdds};
