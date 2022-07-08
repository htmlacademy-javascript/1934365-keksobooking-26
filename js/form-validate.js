const form = document.querySelector('.ad-form');
new Pristine(form);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = Pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});
