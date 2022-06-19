const CHECKTIME = ['12:00', '13:00', '14:00'];
const DESCRIPTIONS = ['Уютный и небольшой отель, окутанный атмосферой непринужденности, в которой каждый гость почувствует себя комфортно',
  'Мини-отель бизнес класса, удачно сочетающий в себе лучшие традиции европейского сервиса и колорит старого Русского города',
  'Ультрасовременный 5-звездочный отель, специально созданный для взыскательных путешественников, которые ценят эксклюзивность, персонализированный сервис и превосходное качество'];
const MAX_GUESTS_VALUE = 10;
const MAX_ROOMS_VALUE = 6;
const TITLES = ['Отель Платан', 'Авангард Отель', 'Бутик-отель Бристоль', 'Аэроотель', 'Хилтон Гарден Инн ', 'Отель Хэмингуэй', 'Гостиница Резидент', 'Римар Отель', 'Forum Plaza', 'Golden Tulip'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

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

const makeAvatar = function () {
  const avatars = [];
  for (let i = 1; i <= 10; i++) {

    if (i < 10) {
      avatars.push(`0${  i}`);
    } else {
      avatars.push(i);
    }
  }
  return avatars[getRandomPositiveInteger(0, avatars.length - 1)];
};

const getRoomsValue = function () {

  return Math.floor(Math.random() * Math.abs(MAX_ROOMS_VALUE));
};

const getGuestsValue = function () {

  return Math.floor(Math.random() * Math.abs(MAX_GUESTS_VALUE));
};

const getFeatures = function () {
  const maxLength = FEATURES.length;
  const lengthOfNewFeatures = getRandomPositiveInteger(1, maxLength);
  const newFeatures = [];

  for (let i = 0; i <= lengthOfNewFeatures; i++) {
    const indexOfNewElement = getRandomPositiveInteger(0, lengthOfNewFeatures);
    const newElement = FEATURES[indexOfNewElement];

    if (!newFeatures.includes(newElement)) {
      newFeatures.push(newElement);
    }
  }
  return newFeatures;
};

const getPhotos = function () {
  const maxLength = PHOTOS.length;
  const lengthOfNewPhotos = getRandomPositiveInteger(1, maxLength);
  const newPhotos = [];

  for (let i = 0; i <= lengthOfNewPhotos; i++) {
    const indexOfNewElement = getRandomPositiveInteger(0, lengthOfNewPhotos);
    const newElement = PHOTOS[indexOfNewElement];

    if (!newPhotos.includes(newElement)) {
      newPhotos.push(newElement);
    }
  }
  return newPhotos;
};

const createAd = function () {
  const randomLat = getRandomPositiveFloat(35.65, 35.7);
  const randomLng = getRandomPositiveFloat(139.7, 139.8);

  return {
    author: {
      avatar: `img/avatars/user${  makeAvatar()  }.png`
    },
    offer: {
      title: TITLES[getRandomPositiveInteger(0, TITLES.length - 1)],
      adress: `${randomLat  }, ${  randomLng}`,
      price: getRandomPositiveInteger(800, 20000),
      type: TYPES[getRandomPositiveInteger(0, TYPES.length - 1)],
      rooms: getRoomsValue(),
      guests: getGuestsValue(),
      checkin: CHECKTIME[getRandomPositiveInteger(0, CHECKTIME.length - 1)],
      checkout: CHECKTIME[getRandomPositiveInteger(0, CHECKTIME.length - 1)],
      features: getFeatures(),
      description: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length - 1)],
      photos: getPhotos()
    },
    location: {
      lat: randomLat,
      lng: randomLng
    }
  };
};

createAd();

const createAds = function () {
  const ads = [];

  for (let i = 0; i < 10; i++) {
    ads.push(createAd(i));
  }

  return ads;
};

createAds();
