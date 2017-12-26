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
  var price = document.querySelector('#price');
  var timeInt = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var type = document.querySelector('#type');
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
  price.addEventListener('invalid', function () {
    if (price.value === '' || price.validity.valueMissing) {
      price.setCustomValidity('Это обязательное поле. Введите число.');
    } else if (price.validity.rangeUnderflow) {
      price.setCustomValidity('Минимальное значение цены - ' + price.min);
    } else if (price.validity.rangeOverflow) {
      price.setCustomValidity('Максимальное значение цены - ' + price.max);
    } else {
      price.setCustomValidity('');
    }
  });

  /**
   * @description при выборе время заезда синхронизирует время выезда
   */
  timeInt.addEventListener('change', function () {
    timeOut.options[timeInt.options.selectedIndex].selected = true;
  });

  /**
   * @description при выборе время выезда синхронизирует время заезда
   */
  timeOut.addEventListener('change', function () {
    timeInt.options[timeOut.options.selectedIndex].selected = true;
  });

  /**
   * @description назначает минимальную цену в зависимости от отмеченного атрибутом selected в HTML типа жилья
   */
  var setPriceForSelectedType = function () {
    switch (type.options.selectedIndex) {
      case 0:
        price.setAttribute('min', APPARTMENT_MIN_PRICE);
        break;
      case 1:
        price.setAttribute('min', SHACK_MIN_PRICE);
        break;
      case 2:
        price.setAttribute('min', HOUSE_MIN_PRICE);
        break;
      case 3:
        price.setAttribute('min', PALACE_MIN_PRICE);
        break;
    }
  };

  setPriceForSelectedType();

  var TypeChangeHandler = function () {
    setPriceForSelectedType();
  };

  /**
   * @description при выборе в форме типа жилья синхронизирует минимальную цену
   */
  type.addEventListener('change', TypeChangeHandler);

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

  setRoomsForSelectedType();

  var RoomChangeHandler = function () {
    setRoomsForSelectedType();
  };

  /**
   * @description при выборе кол-ва комнат в форме синхронизирует кол-во гостей
   */
  rooms.addEventListener('change', RoomChangeHandler);


  /**
   * @description проверяет перед отправкой формы input-ы
   */
  form.addEventListener('submit', function (evt) {
    var inputs = [title, price, address];

    for (var w = 0; w < inputs.length; w++) {
      if (!inputs[w].validity.valid || inputs[w].value === '') {
        inputs[w].style.borderColor = 'red';
        evt.preventDefault();
      }
    }
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

  disableForm();
  window.form = {
    disableFields: disableFields,
    disableForm: disableForm,
    activateFields: activateFields,
    activateForm: activateForm
  };
})();
