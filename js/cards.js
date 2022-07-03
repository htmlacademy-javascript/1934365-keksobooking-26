import {createAdds} from './data.js';

const cardPlace = document.querySelector('.map');
const cardPlaceElement = cardPlace.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup'); //Находим в содержимом шаблона блок с классом popup

const similarAdds = createAdds();//Присваиваем переменной значение функции по созданию массива с объектами

const accomodationType = {// Словарь видов жилья
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const generateFeatures = (featureArray) => {
  const featuresFragmentElement = document.createDocumentFragment();//Создаём документ-фрагмент
  const featureTemplateElement = cardTemplate.querySelector('.popup__features').cloneNode(true);//Клонируем список
  const featureListTemplateElement = featureTemplateElement.querySelectorAll('.popup__feature');//Создаём коллекцию (массив) элементов списка
  const makeFeatureArray = featureArray.map((item) => `popup__feature--${item}`);//Создаём функцию по созданию модифицированного массива
  featureListTemplateElement.forEach((listItem) => {//Для каждого элемента списка проводим сл.операцию
    const cssModifier = listItem.classList[1];//С помощью свойства classList выбираем эл-т popup__feature--*** и присваиваем его значение переменной
    if (makeFeatureArray.includes(cssModifier)) {//Если в модифицированном массиве есть модификатор, то
      featuresFragmentElement.appendChild(listItem);//добавляем элемент списка в документ-фрагмент
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

  const cardElement = cardTemplate.cloneNode(true);//Клонируем блок шаблона
  cardElement.querySelector('.popup__title').textContent = card.offer.title;//находим в шаблоне элемент с классом popup__title и записываем в его содержимое данные из массива
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;//то же самое
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price  } ₽/ночь`;//то же самое
  const typeArray = Object.keys(accomodationType);
  if (typeArray.includes(card.offer.type)) {
    cardElement.querySelector('.popup__type').textContent = accomodationType[card.offer.type];
  }
  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms  } комнаты для ${card.offer.guests} гостей`;//то же самое
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin  } выезд до ${card.offer.checkout}`;//то же самое
  if (card.offer.features) {
    cardElement.querySelector('.popup__features').textContent = '';//Очищаем разметку блока features от элементов
    cardElement.querySelector('.popup__features').appendChild(generateFeatures(card.offer.features));//добавляем в DOM элементы массива
  } else {
    cardElement.querySelector('.popup__features').remove();//удаляем лишние элементы из разметки
  }
  const descriptionElement = cardElement.querySelector('.popup__description').textContent = card.offer.description;//то же самое
  if (card.offer.description === '') {
    descriptionElement.classList.add('visually-hidden');
  }
  cardElement.querySelector('.popup__photos').textContent = '';
  cardElement.querySelector('.popup__photos').appendChild(generatePhotos(card.offer.photos));


  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  cardPlaceElement.appendChild(cardElement);
});


