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

const getRandomValue = function (value) {

  return Math.floor(Math.random() * value);
};

const getRandomArray = function (array) {
  const maxLength = array.length;
  const lengthOfNewArray = getRandomPositiveInteger(0, maxLength);
  const newArray = [];

  for (let i = 0; i <= lengthOfNewArray; i++) {
    const indexOfNewElement = getRandomPositiveInteger(0, lengthOfNewArray - 1);
    const newElement = array[indexOfNewElement];

    if (!newArray.includes(newElement)) {
      newArray.push(newElement);
    }
  }

  return newArray;
};

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomValue, getRandomArray};
