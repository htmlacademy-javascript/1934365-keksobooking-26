import {createAdds} from './data.js';

const cardPlace = document.querySelector('.map');
const cardPlaceElement = cardPlace.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarAdds = createAdds();

// Словарь видов жилья
// const offerNameByType = {
//   flat: 'Квартира',
//   bungalow: 'Бунгало',
//   house: 'Дом',
//   palace: 'Дворец',
//   hotel: 'Отель'
// };

similarAdds.forEach((card) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price  } ₽/ночь`;
  // cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms  } комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin  } выезд до ${card.offer.checkout}`;
  // cardElement.querySelector('.popup__features');
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  //cardElement.querySelector('.popup__photos')
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  cardPlaceElement.append(cardElement);
});

