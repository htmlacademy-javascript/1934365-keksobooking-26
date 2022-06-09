function getRandomIntInclusive(min, max) {
  if (min >= 0 && max >= 0 && max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return ('Введены некорректные данные');
  }
}

getRandomIntInclusive(2, 9);

function getRandomArbitrary(min, max, digitAmount = 0) {
  if (min >= 0 && max >= 0 && max > min) {
    const digitDegree = 10 ** digitAmount;
    return ~~ ((Math.random() * (max - min + 1) + min) * digitDegree) / digitDegree;
  } else {
    return ('Введены некорректные данные');
  }
}

getRandomArbitrary(0, 5, 4);
