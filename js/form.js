'use strict';

(function () {
  var TITLE_MIN_LENGTH = 30;
  var TITLE_MAX_LENGTH = 100;
  var SHACK_MIN_PRICE = 0;
  var APPARTMENT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;

  var form = document.querySelector('.notice__form');
  var fields = document.querySelectorAll('form.notice__form fieldset');
  var address = document.querySelector('#address');
  var title = document.querySelector('#title');
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');
  var apartmentType = document.querySelector('#type');
  var pricePerNight = document.querySelector('#price');
  var rooms = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');
  var inputs = [title, pricePerNight, address];

  /**
   * @description выводит комментарии, если поле Заголовок не заполнено или введено менее 30 символов
   */
  var validateTitle = function () {
    if (title.validity.valueMissing) {
      title.setCustomValidity('Это обязательное поле. Введите от ' + TITLE_MIN_LENGTH + ' до ' + TITLE_MAX_LENGTH + ' символов.');
    } else if (title.validity.tooShort) {
      title.setCustomValidity('Минимальная длина — ' + TITLE_MIN_LENGTH + ' символов');
    } else {
      title.setCustomValidity('');
    }
  };

  /**
   * @description выводит комментарии, если поле Цена не заполненно или заполнено неверно
   */
  var validatepricePerNight = function () {
    if (pricePerNight.value === '' || pricePerNight.validity.valueMissing) {
      pricePerNight.setCustomValidity('Это обязательное поле. Введите число.');
    } else if (pricePerNight.validity.rangeUnderflow) {
      pricePerNight.setCustomValidity('Минимальное значение цены - ' + pricePerNight.min);
    } else if (pricePerNight.validity.rangeOverflow) {
      pricePerNight.setCustomValidity('Максимальное значение цены - ' + pricePerNight.max);
    } else {
      pricePerNight.setCustomValidity('');
    }
  };

  /**
   * @description назначает минимальную цену в зависимости от отмеченного атрибутом selected в HTML типа жилья
   */
  var setPriceForSelectedType = function () {
    switch (apartmentType.options.selectedIndex) {
      case 0:
        pricePerNight.setAttribute('min', APPARTMENT_MIN_PRICE);
        break;
      case 1:
        pricePerNight.setAttribute('min', SHACK_MIN_PRICE);
        break;
      case 2:
        pricePerNight.setAttribute('min', HOUSE_MIN_PRICE);
        break;
      case 3:
        pricePerNight.setAttribute('min', PALACE_MIN_PRICE);
        break;
    }
  };

  /**
   * @description синхронизирует кол-во гостей в зависимости от кол-ва комнат
   */
  var setRoomsForSelectedType = function () {
    switch (rooms.options.selectedIndex) {
      case 0:
        guests.options[2].selected = true;
        guests.options[0].setAttribute('disabled', 'disabled');
        guests.options[1].setAttribute('disabled', 'disabled');
        guests.options[3].removeAttribute('disabled');
        guests.options[3].setAttribute('disabled', 'disabled');
        break;
      case 1:
        guests.options[1].selected = true;
        guests.options[0].setAttribute('disabled', 'disabled');
        guests.options[1].removeAttribute('disabled');
        guests.options[2].removeAttribute('disabled');
        guests.options[3].setAttribute('disabled', 'disabled');
        break;
      case 2:
        guests.options[0].selected = true;
        guests.options[0].removeAttribute('disabled');
        guests.options[1].removeAttribute('disabled');
        guests.options[2].removeAttribute('disabled');
        guests.options[3].setAttribute('disabled', 'disabled');
        break;
      case 3:
        guests.options[3].selected = true;
        guests.options[0].setAttribute('disabled', 'disabled');
        guests.options[1].setAttribute('disabled', 'disabled');
        guests.options[2].setAttribute('disabled', 'disabled');
        guests.options[3].removeAttribute('disabled');
        break;
    }
  };

  /**
   * @description проверяет валидность полей формы
   * @param {Array} fieldsToCheck
   * @return {Boolean}
   */
  var checkValidity = function (fieldsToCheck) {
    for (var w = 0; w < fieldsToCheck.length; w++) {
      if (!fieldsToCheck[w].validity.valid || fieldsToCheck[w].value === '') {
        fieldsToCheck[w].style.borderColor = 'red';
        return false;
      }
    }
    return true;
  };

  /**
   * @description очищает форму после отправки
   */
  var resetForm = function () {
    form.reset();
    var photo = window.data.photoContainer.querySelectorAll('img');
    for (var t = 0; t < photo.length; t++) {
      photo[t].remove();
    }
    window.data.avatar.src = 'img/muffin.png';
    assignAddress(window.pin.main.offsetLeft, window.pin.main.offsetTop);
  };

  /**
   * @description отправляем валидную форму на сервер
   */
  form.addEventListener('submit', function (evt) {
    if (!checkValidity(inputs)) {
      evt.preventDefault();
      return;
    }

    window.backend.upload(new FormData(form), resetForm, window.utils.errorHandler);

    evt.preventDefault();
  }, false);

  /**
   * @description делает поля формы c классом notice__form объединенные в fieldset недоступными
   */
  var disableFields = function () {
    for (var i = 0; i < fields.length; i++) {
      fields[i].setAttribute('disabled', 'disabled');
    }
  };

  /**
   * @description делает форму c классом notice__form неактивной
   */
  var disableForm = function () {
    form.classList.add('notice__form--disabled');
    disableFields();
  };

  /**
   * @description делает поля формы c классом notice__form объединенные в fieldset доступными
   */
  var activateFields = function () {
    for (var i = 0; i < fields.length; i++) {
      fields[i].removeAttribute('disabled');
    }
  };

  /**
   * @description делает форму c классом notice__form активной
   */
  var activateForm = function () {
    form.classList.remove('notice__form--disabled');
    activateFields();
  };

  /**
   * @description отображате адрес в поле - координата острого конца метки
   * @param {number} x
   * @param {number} y
   */
  var assignAddress = function (x, y) {
    address.value = 'x: ' + (x + (window.pin.parameters.WIDTH / 2)) + ', y: ' + (y + window.pin.parameters.HEIGHT);
  };

  disableForm();
  setPriceForSelectedType();
  setRoomsForSelectedType();

  title.addEventListener('invalid', validateTitle);
  title.addEventListener('change', validateTitle);
  pricePerNight.addEventListener('invalid', validatepricePerNight);
  pricePerNight.addEventListener('change', validatepricePerNight);
  rooms.addEventListener('change', setRoomsForSelectedType);

  window.synchronizeFields(checkinTime, checkoutTime, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], window.utils.syncValues);
  window.synchronizeFields(apartmentType, pricePerNight, ['flat', 'bungalo', 'house', 'palace'], [APPARTMENT_MIN_PRICE, SHACK_MIN_PRICE, HOUSE_MIN_PRICE, PALACE_MIN_PRICE], window.utils.syncValueWithMin);
  window.form = {
    activate: activateForm,
    assignAddress: assignAddress
  };
})();
