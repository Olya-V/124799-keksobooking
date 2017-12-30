'use strict';

(function () {
  var PIN_MAIN = {
    HEIGHT: 87,
    WIDTH: 65
  };
  var PIN_LIMITS = {
    Y_MIN: 100,
    Y_MAX: 500
  };
  var pinsBlock = document.querySelector('div.map__pins');
  var pinMain = document.querySelector('.map__pin--main');
  /**
   * @description создает DOM-элемен - пин
   * @param {object} offer одно обявление
   * @return {Node} новую DOM-ноду - пин
   */
  var createPin = function (offer) {
    var templatePin = document.querySelector('template').content.querySelector('button.map__pin');
    var elementPin = templatePin.cloneNode(true);

    elementPin.style.left = offer.location.x + 'px';
    elementPin.style.top = offer.location.y + 'px';
    elementPin.querySelector('img').src = offer.author.avatar;

    return elementPin;
  };
  // сохраним данные после загрузки
  var offers = [];
  /**
   * @description получает данные о схожих объявлениях с сервера
   * @param {Array} data массив данных с сервера со схожими объявлениями
   */
  var successHandler = function (data) {
    offers = data;
  };

  var renderPins = function (offersElements) {
    /**
     * @description обработчик клика по пину.
     * @param {object} evt
     */
    var pinClickHandler = function (evt) {
      disablePin();
      window.card.deleteOpenedPopup();
      window.showCard(offersElements[activatePin(evt)]);
    };
    /**
     * @description отрисовывает пины на основе загруженных объявлений в блоке .map__pins
     */
    var fragmentPins = document.createDocumentFragment();
    for (var k = 0; k < offersElements.length && k < 5; k++) {
      var newPin = createPin(offersElements[k]);
      newPin.setAttribute('data-id', k);
      newPin.addEventListener('click', pinClickHandler);
      fragmentPins.appendChild(newPin);
    }
    pinsBlock.appendChild(fragmentPins);
  };

  var deletePins = function () {
    var pins = document.querySelectorAll('.map__pin[data-id]');
    Array.from(pins).forEach(function (value) {
      value.remove();
    });
  };


  /**
   * @description активирует пин при нажатии (пин подсвечивается)
   * @param {object} evt
   * @return {object} id активного пина (button), по которому кликнули/нажали
   */
  var activatePin = function (evt) {
    var activePin = evt.currentTarget;
    activePin.classList.add('map__pin--active');
    return activePin.dataset.id;
  };

  /**
   * @description деактивирует пины, которые были активны (убирает подсветку)
   */
  var disablePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  /**
   * @description обработчик события клик по Кекс-пину
   * @constructor
   */
  var keksPinClickHandler = function () {
    window.map.showMap();
    window.form.activateForm();
    renderPins(offers);
    pinMain.removeEventListener('mouseup', keksPinClickHandler);
  };
  window.backend.download(successHandler, window.utils.errorHandler);
  pinMain.addEventListener('mouseup', keksPinClickHandler);
  window.pin = {
    pinMain: pinMain,
    pinMainParams: PIN_MAIN,
    pinLimits: PIN_LIMITS,
    disablePin: disablePin
  };

  // Ф И Л Ь Т Р Ы
  var filters = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };

  var filterOffers = function (offersElements, filtersObject) {
    var newOffers = offersElements.filter(function (item) {

      var filteredByFeatures = true;

      for (var i = 0; i < filtersObject.features.length; i++) {
        if (item.offer.features.indexOf(filtersObject.features[i]) === -1) {
          filteredByFeatures = false;
          break;
        }
      }

      var filteredByPrice = (
        (item.offer.price < 10000 && filtersObject.price === 'low') ||
        (item.offer.price >= 10000 && item.offer.price <= 50000 && filtersObject.price === 'middle') ||
        (item.offer.price > 50000 && filtersObject.price === 'high') ||
        filtersObject.price === 'any');


      return ((item.offer.type === filtersObject.type || filtersObject.type === 'any') &&
        filteredByPrice &&
        (item.offer.rooms.toString() === filtersObject.rooms || filtersObject.rooms === 'any') &&
        (item.offer.guests.toString() === filtersObject.guests || filtersObject.guests === 'any') &&
        filteredByFeatures);
    });
    return newOffers.slice(0, 4);
  };

  var filtersChangeHandler = function () {
    deletePins();
    var filteredOffers = filterOffers(offers, filters);
    renderPins(filteredOffers);
  };


  var housingType = document.querySelector('#housing-type');
  housingType.addEventListener('change', function () {
    filters.type = housingType.value;
    console.log('type: ' + filters.type);
    window.debounce(filtersChangeHandler);
  });

  var housingPrice = document.querySelector('#housing-price');
  housingPrice.addEventListener('change', function () {
    filters.price = housingPrice.value;
    console.log('price: ' + filters.price);
    window.debounce(filtersChangeHandler);
  });

  var housingRooms = document.querySelector('#housing-rooms');
  housingRooms.addEventListener('change', function () {
    filters.rooms = housingRooms.value;
    console.log('rooms: ' + filters.rooms);
    window.debounce(filtersChangeHandler);
  });


  var housingGuests = document.querySelector('#housing-guests');
  housingGuests.addEventListener('change', function () {
    filters.guests = housingGuests.value;
    console.log('guests: ' + filters.guests);
    window.debounce(filtersChangeHandler);
  });

  var housingFeatures = Array.from(document.querySelectorAll('#housing-features input'));

  housingFeatures.forEach(function (value) {
    value.addEventListener('change', function () {

      filters.features = housingFeatures.reduce(function (accumulator, item) {
        if (item.checked === true) {
          accumulator.push(item.value);
        }
        return accumulator;
      }, []);
      console.log('features: ' + filters.features);
      window.debounce(filtersChangeHandler);
    });
  });
})();
