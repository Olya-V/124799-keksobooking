'use strict';

(function () {
  var FILTER_PRICE = {
    lowTo: 10000,
    middleFrom: 10000,
    middleTo: 50000,
    hightFrom: 50000
  };
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = Array.from(document.querySelectorAll('#housing-features input'));
  var filters = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };

  /**
   * @description фильтрует основной массив объявлений по критериям устгновленных фильтров
   * @param {Array} offersElements
   * @param {Array} filtersObject
   * @return {Array}
   */
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
        (item.offer.price < FILTER_PRICE.lowTo && filtersObject.price === 'low') ||
        (item.offer.price >= FILTER_PRICE.middleFrom && item.offer.price <= FILTER_PRICE.middleTo && filtersObject.price === 'middle') ||
        (item.offer.price > FILTER_PRICE.hightFrom && filtersObject.price === 'high') ||
        filtersObject.price === 'any');


      return ((item.offer.type === filtersObject.type || filtersObject.type === 'any') &&
        filteredByPrice &&
        (item.offer.rooms.toString() === filtersObject.rooms || filtersObject.rooms === 'any') &&
        (item.offer.guests.toString() === filtersObject.guests || filtersObject.guests === 'any') &&
        filteredByFeatures);
    });
    return newOffers.slice(0, window.pin.amount - 1);
  };

  /**
   * @description обработчик измениня значений фильтров
   */
  var filtersChangeHandler = function () {
    window.card.remove();
    window.pin.remove();
    var filteredOffers = filterOffers(window.data.offers, filters);
    window.pin.render(filteredOffers);
  };

  housingType.addEventListener('change', function () {
    filters.type = housingType.value;
    window.debounce(filtersChangeHandler);
  });

  housingPrice.addEventListener('change', function () {
    filters.price = housingPrice.value;
    window.debounce(filtersChangeHandler);
  });

  housingRooms.addEventListener('change', function () {
    filters.rooms = housingRooms.value;
    window.debounce(filtersChangeHandler);
  });

  housingGuests.addEventListener('change', function () {
    filters.guests = housingGuests.value;
    window.debounce(filtersChangeHandler);
  });

  /**
   * @description формирует новый массив фич по выбранным в фильтре
   */
  var selectFeatures = function () {
    housingFeatures.reduce(function (accumulator, item) {
      if (item.checked === true) {
        accumulator.push(item.value);
      }
      return accumulator;
    }, []);
  };

  housingFeatures.forEach(function (value) {
    value.addEventListener('change', function () {
      filters.features = selectFeatures();
      window.debounce(filtersChangeHandler);
    });
  });
})();
