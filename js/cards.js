import {createAdds} from './data.js';

const cardPlace = document.querySelector('.map');
const cardPlaceElement = cardPlace.querySelector('#map-canvas');

// Находим в содержимом шаблона блок с классом popup
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

// Присваиваем переменной значение функции по созданию массива с объектами
const similarAdds = createAdds();

// Словарь видов жилья
const accommodationType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const generateFeatures = (features) => {

  // // Создаём документ-фрагмент
  // const featuresFragmentElement = document.createDocumentFragment();
  // // Клонируем список
  // const featureTemplateElement = cardTemplate.querySelector('.popup__features').cloneNode(true);
  // // Создаём коллекцию (массив) элементов списка
  // const featureListTemplateElement = featureTemplateElement.querySelectorAll('.popup__feature');
  // // Создаём функцию по созданию модифицированного массива
  // const makeFeatures = features.map((item) => `popup__feature--${item}`);

  // // Для каждого элемента списка проводим сл.операцию
  // featureListTemplateElement.forEach((listItem) => {
  //   // С помощью свойства classList выбираем эл-т popup__feature--*** и присваиваем его значение переменной
  //   const cssModifier = listItem.classList[`popup__feature--${item}`];
  //   // Если в модифицированном массиве есть модификатор, то
  //   if (makeFeatures.includes(cssModifier)) {
  //     // добавляем элемент списка в документ-фрагмент
  //     featuresFragmentElement.appendChild(listItem);
  //   }
  // });
  const featuresFragmentElement = document.createDocumentFragment();

  for (let i = 0; i < features.length; i++) {
    const featureListTemplateElement = cardTemplate.querySelector('.popup__feature').cloneNode(true);
    featureListTemplateElement.classList.remove('popup__feature--wifi');
    featureListTemplateElement.classList.add(`popup__feature--${features[i]}`);

    featuresFragmentElement.appendChild(featureListTemplateElement);
  }

  return featuresFragmentElement;
};

const generatePhotos = (photos) => {
  const photoFragmentElement = document.createDocumentFragment();

  for (let i = 0; i < photos.length; i++) {
    const photoListTemplateElement = cardTemplate.querySelector('.popup__photo').cloneNode(true);
    photoListTemplateElement.src = photos[i];
    photoFragmentElement.appendChild(photoListTemplateElement);
  }

  return photoFragmentElement;
};

// Функция по добавлению в объявление типа жилья
const getAccommodationType = (accommodationName, addTemplateElement) => {
  addTemplateElement.querySelector('.popup__type').textContent = accommodationType[accommodationName];
};

// Функция по добавлению в объявление доп.удобств
const getFeatures = (featuresName, addTemplateElement) => {
  if (featuresName) {
  // Очищаем разметку блока features от элементов
    addTemplateElement.querySelector('.popup__features').innerHTML = '';
    //добавляем в DOM элементы массива
    addTemplateElement.querySelector('.popup__features').appendChild(generateFeatures(featuresName));
  } else {
  // удаляем лишние элементы из разметки
    addTemplateElement.querySelector('.popup__features').remove();
  }
};

// Функция, которая скрывает поле описания, если оно не заполнено
const getDescription = (descriptionName, addTemplateElement) => {
  const descriptionElement = addTemplateElement.querySelector('.popup__description').textContent = descriptionName;
  if (!descriptionName) {
    descriptionElement.classList.add('hidden');
  }
};

similarAdds.forEach((card) => {
  // Клонируем блок шаблона
  const cardElement = cardTemplate.cloneNode(true);
  // находим в шаблоне элемент с классом popup__title и записываем в его содержимое данные из массива
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price  } ₽/ночь`;

  getAccommodationType(card.offer.type, cardElement);

  // Добавить склонения комнат и гостей
  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms  } комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin  } выезд до ${card.offer.checkout}`;

  getFeatures(card.offer.features, cardElement);

  getDescription(card.offer.description, cardElement);

  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').appendChild(generatePhotos(card.offer.photos));

  cardPlaceElement.appendChild(cardElement);
});


