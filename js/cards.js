// Находим в содержимом шаблона блок с классом popup
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

// Словарь видов жилья
const accommodationType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const generateFeatures = (features) => {
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

const setElementValue = (data, element, attribute) => {
  if (data) {
    element[attribute] = data;
  } else {
    element.remove();
  }
};

const similarAdds = (incomingData) => {
  // Клонируем блок шаблона
  const cardElement = cardTemplate.cloneNode(true);
  // находим в шаблоне элемент с классом popup__title и записываем в его содержимое данные из массива
  setElementValue(incomingData.author.avatar, cardElement.querySelector('.popup__avatar'), 'src');
  setElementValue(incomingData.offer.title, cardElement.querySelector('.popup__title'), 'textContent');
  setElementValue(incomingData.offer.address, cardElement.querySelector('.popup__text--address'), 'textContent');
  setElementValue(incomingData.offer.price, cardElement.querySelector('.js__price'), 'textContent');
  setElementValue(accommodationType[incomingData.offer.type], cardElement.querySelector('.popup__type'), 'textContent');
  setElementValue(incomingData.offer.description, cardElement.querySelector('.popup__description'), 'textContent');

  if (incomingData.offer.checkin && incomingData.offer.checkout) {
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${incomingData.offer.checkin  } выезд до ${incomingData.offer.checkout}`;
  } else {
    cardElement.querySelector('.popup__text--time').remove();
  }

  if (incomingData.offer.rooms && incomingData.offer.guests) {
    cardElement.querySelector('.popup__text--capacity').textContent = `${incomingData.offer.rooms  } комнаты для ${incomingData.offer.guests} гостей`;
  } else {
    cardElement.querySelector('.popup__text--capacity').remove();
  }

  getFeatures(incomingData.offer.features, cardElement);

  if (incomingData.offer.photos) {
    cardElement.querySelector('.popup__photos').innerHTML = '';
    cardElement.querySelector('.popup__photos').appendChild(generatePhotos(incomingData.offer.photos));
  } else {
    cardElement.querySelector('.popup__photos').remove();
  }

  return cardElement;
};

export {similarAdds};

