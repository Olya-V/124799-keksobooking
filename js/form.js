'use strict';

(function () {
  var TITLE_MIN_LENGTH = 30;
  var TITLE_MAX_LENGTH = 100;
  var SHACK_MIN_PRICE = '0';
  var APPARTMENT_MIN_PRICE = '1000';
  var HOUSE_MIN_PRICE = '5000';
  var PALACE_MIN_PRICE = '10000';

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

  /**
   * @description выводит комментарии, если поле Заголовок не заполнено или введено менее 30 символов
   */
  title.addEventListener('invalid', function () {
    if (title.validity.valueMissing) {
      title.setCustomValidity('Это обязательное поле. Введите от ' + TITLE_MIN_LENGTH + ' до ' + TITLE_MAX_LENGTH + ' символов.');
    } else if (title.validity.tooShort) {
      title.setCustomValidity('Минимальная длина — ' + TITLE_MIN_LENGTH + ' символов');
    } else {
      title.setCustomValidity('');
    }
  });

  /**
   * @description выводит комментарии, если поле Цена не заполненно или заполнено неверно
   */
  pricePerNight.addEventListener('invalid', function () {
    if (pricePerNight.value === '' || pricePerNight.validity.valueMissing) {
      pricePerNight.setCustomValidity('Это обязательное поле. Введите число.');
    } else if (pricePerNight.validity.rangeUnderflow) {
      pricePerNight.setCustomValidity('Минимальное значение цены - ' + pricePerNight.min);
    } else if (pricePerNight.validity.rangeOverflow) {
      pricePerNight.setCustomValidity('Максимальное значение цены - ' + pricePerNight.max);
    } else {
      pricePerNight.setCustomValidity('');
    }
  });
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
   * @description синхронизирует кол-во гостей в зависимости от отмеченного атрибутом selected в HTML кол-ва комнат
   */
  var setRoomsForSelectedType = function () {
    switch (rooms.options.selectedIndex) {
      case 0:
        guests.options[2].selected = true;
        break;
      case 1:
        guests.options[1].selected = true;
        break;
      case 2:
        guests.options[0].selected = true;
        break;
      case 3:
        guests.options[3].selected = true;
        break;
    }
  };
  /**
   * @description проверяет перед отправкой формы input-ы
   */
  form.addEventListener('submit', function (evt) {
    var inputs = [title, pricePerNight, address];

    for (var w = 0; w < inputs.length; w++) {
      if (!inputs[w].validity.valid || inputs[w].value === '') {
        inputs[w].style.borderColor = 'red';
        evt.preventDefault();
      }
    }
    window.backend.upload(new FormData(form), function () {
      form.reset();
    }, window.utils.errorHandler);
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
    address.value = 'x: ' + (x + (window.pin.pinMainParams.WIDTH / 2)) + ', y: ' + (y + window.pin.pinMainParams.HEIGHT);
  };

  disableForm();
  setPriceForSelectedType();
  setRoomsForSelectedType();
  window.synchronizeFields.call(checkinTime, checkoutTime, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], window.utils.syncValues);
  window.synchronizeFields.call(apartmentType, pricePerNight, ['flat', 'bungalo', 'house', 'palace'], [1000, 0, 5000, 10000], window.utils.syncValueWithMin);
  window.synchronizeFields.call(rooms, guests, ['1', '2', '3', '100'], ['1', '2', '3', '0'], window.utils.syncValues);
  window.form = {
    activateForm: activateForm,
    assignAddress: assignAddress
  };
})();
