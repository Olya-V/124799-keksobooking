'use strict';
(function () {
  var TITLE_MIN_LENGTH = 30;
  var TITLE_MAX_LENGTH = 100;
  var SHACK_MIN_PRICE = '0';
  var APPARTMENT_MIN_PRICE = '1000';
  var HOUSE_MIN_PRICE = '5000';
  var PALACE_MIN_PRICE = '10000';

  var adForm = document.querySelector('.notice__form');
  var adAddress = document.querySelector('#address');
  var adTitle = document.querySelector('#title');
  var adPrice = document.querySelector('#price');
  var adTimeInt = document.querySelector('#timein');
  var adTimeOut = document.querySelector('#timeout');
  var adType = document.querySelector('#type');
  var adRooms = document.querySelector('#room_number');
  var adGuests = document.querySelector('#capacity');

  /**
   * @description выводит комментарии, если поле Заголовок не заполнено или введено менее 30 символов
   */
  adTitle.addEventListener('invalid', function () {
    if (adTitle.validity.valueMissing) {
      adTitle.setCustomValidity('Это обязательное поле. Введите от ' + TITLE_MIN_LENGTH + ' до ' + TITLE_MAX_LENGTH + ' символов.');
    } else if (adTitle.validity.tooShort) {
      adTitle.setCustomValidity('Минимальная длина — ' + TITLE_MIN_LENGTH + ' символов');
    } else {
      adTitle.setCustomValidity('');
    }
  });

  /**
   * @description выводит комментарии, если поле Цена не заполненно или заполнено неверно
   */
  adPrice.addEventListener('invalid', function () {
    if (adPrice.value === '' || adPrice.validity.valueMissing) {
      adPrice.setCustomValidity('Это обязательное поле. Введите число.');
    } else if (adPrice.validity.rangeUnderflow) {
      adPrice.setCustomValidity('Минимальное значение цены - ' + adPrice.min);
    } else if (adPrice.validity.rangeOverflow) {
      adPrice.setCustomValidity('Максимальное значение цены - ' + adPrice.max);
    } else {
      adPrice.setCustomValidity('');
    }
  });

  /**
   * @description при выборе время заезда синхронизирует время выезда
   */
  adTimeInt.addEventListener('change', function () {
    adTimeOut.options[adTimeInt.options.selectedIndex].selected = true;
  });

  /**
   * @description при выборе время выезда синхронизирует время заезда
   */
  adTimeOut.addEventListener('change', function () {
    adTimeInt.options[adTimeOut.options.selectedIndex].selected = true;
  });

  /**
   * @description назначает минимальную цену в зависимости от отмеченного атрибутом selected в HTML типа жилья
   */
  var setPriceForSelectedType = function () {
    switch (adType.options.selectedIndex) {
      case 0:
        adPrice.setAttribute('min', APPARTMENT_MIN_PRICE);
        break;
      case 1:
        adPrice.setAttribute('min', SHACK_MIN_PRICE);
        break;
      case 2:
        adPrice.setAttribute('min', HOUSE_MIN_PRICE);
        break;
      case 3:
        adPrice.setAttribute('min', PALACE_MIN_PRICE);
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
  adType.addEventListener('change', TypeChangeHandler);

  /**
   * @description синхронизирует кол-во гостей в зависимости от отмеченного атрибутом selected в HTML кол-ва комнат
   */
  var setRoomsForSelectedType = function () {
    switch (adRooms.options.selectedIndex) {
      case 0:
        adGuests.options[2].selected = true;
        break;
      case 1:
        adGuests.options[1].selected = true;
        break;
      case 2:
        adGuests.options[0].selected = true;
        break;
      case 3:
        adGuests.options[3].selected = true;
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
  adRooms.addEventListener('change', RoomChangeHandler);


  /**
   * @description проверяет перед отправкой формы input-ы
   */
  adForm.addEventListener('submit', function (evt) {
    var inputs = [adTitle, adPrice, adAddress];

    for (var w = 0; w < inputs.length; w++) {
      if (!inputs[w].validity.valid || inputs[w].value === '') {
        inputs[w].style.borderColor = 'red';
        evt.preventDefault();
      }
    }
  }, false);
})();
