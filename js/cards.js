import {createAdds} from './data.js';

const cardPlace = document.querySelector('.map');
const cardPlaceElement = cardPlace.querySelector('#map-canvas');

//Находим в содержимом шаблона блок с классом popup
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

//Присваиваем переменной значение функции по созданию массива с объектами
const similarAdds = createAdds();

// Словарь видов жилья
const accommodationType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const generateFeatures = (featureArray) => {

  //Создаём документ-фрагмент
  const featuresFragmentElement = document.createDocumentFragment();
  //Клонируем список
  const featureTemplateElement = cardTemplate.querySelector('.popup__features').cloneNode(true);
  //Создаём коллекцию (массив) элементов списка
  const featureListTemplateElement = featureTemplateElement.querySelectorAll('.popup__feature');
  //Создаём функцию по созданию модифицированного массива
  const makeFeatureArray = featureArray.map((item) => `popup__feature--${item}`);

  //Для каждого элемента списка проводим сл.операцию
  featureListTemplateElement.forEach((listItem) => {
    //С помощью свойства classList выбираем эл-т popup__feature--*** и присваиваем его значение переменной
    const cssModifier = listItem.classList[1];
    //Если в модифицированном массиве есть модификатор, то
    if (makeFeatureArray.includes(cssModifier)) {
      //добавляем элемент списка в документ-фрагмент
      featuresFragmentElement.appendChild(listItem);
    }
  });

  return featuresFragmentElement;
};

const generatePhotos = (photoArray) => {
  const photoFragmentElement = document.createDocumentFragment();
  for (let i = 0; i < photoArray.length; i++) {
    const photoListTemplateElement = cardTemplate.querySelector('.popup__photo').cloneNode(true);
    photoListTemplateElement.src = photoArray[i];
    photoFragmentElement.appendChild(photoListTemplateElement);
  }

  return photoFragmentElement;
};

similarAdds.forEach((card) => {
  //Клонируем блок шаблона
  const cardElement = cardTemplate.cloneNode(true);
  //находим в шаблоне элемент с классом popup__title и записываем в его содержимое данные из массива
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price  } ₽/ночь`;

  const typeArray = Object.keys(accommodationType);
  if (typeArray.includes(card.offer.type)) {
    cardElement.querySelector('.popup__type').textContent = accommodationType[card.offer.type];
  }

  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms  } комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin  } выезд до ${card.offer.checkout}`;

  if (card.offer.features) {
    //Очищаем разметку блока features от элементов
    cardElement.querySelector('.popup__features').textContent = '';
    //добавляем в DOM элементы массива
    cardElement.querySelector('.popup__features').appendChild(generateFeatures(card.offer.features));
  } else {
    //удаляем лишние элементы из разметки
    cardElement.querySelector('.popup__features').remove();
  }

  const descriptionElement = cardElement.querySelector('.popup__description').textContent = card.offer.description;
  if (card.offer.description === '') {
    descriptionElement.classList.add('visually-hidden');
  }

  cardElement.querySelector('.popup__photos').textContent = '';
  cardElement.querySelector('.popup__photos').appendChild(generatePhotos(card.offer.photos));

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  cardPlaceElement.appendChild(cardElement);
});


