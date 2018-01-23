'use strict';

var FilterPrice = {
  LOW: 10000,
  MIDDLE_START: 10000,
  MIDDLE_END: 50000,
  HIGHT: 50000
};

var housingType = document.querySelector('#housing-type');
var housingPrice = document.querySelector('#housing-price');
var housingRooms = document.querySelector('#housing-rooms');
var housingGuests = document.querySelector('#housing-guests');
var housingFeatures = Array.from(document.querySelectorAll('#housing-features input'));
var Filter = {
  TYPE: 'any',
  PRICE: 'any',
  ROOMS: 'any',
  GUESTS: 'any',
  FEATURES: []
};

/**
 * @description фильтрует основной массив объявлений по критериям установленных фильтров
 * @param {Array} offersElements
 * @param {Array} filtersObject
 * @return {Array}
 */
var filterOffers = function (offersElements, filtersObject) {
  var newOffers = offersElements.filter(function (item) {

    var filteredByFeatures = true;

    for (var i = 0; i < filtersObject.FEATURES.length; i++) {
      if (item.offer.features.indexOf(filtersObject.FEATURES[i]) === -1) {
        filteredByFeatures = false;
        break;
      }
    }
    var filteredByPrice = (
      (item.offer.price < FilterPrice.LOW && filtersObject.PRICE === 'low') ||
      (item.offer.price >= FilterPrice.MIDDLE_START && item.offer.price <= FilterPrice.MIDDLE_END && filtersObject.PRICE === 'middle') ||
      (item.offer.price > FilterPrice.HIGHT && filtersObject.PRICE === 'high') || filtersObject.PRICE === 'any');


    return ((item.offer.type === filtersObject.TYPE || filtersObject.TYPE === 'any') &&
      filteredByPrice &&
      (item.offer.rooms.toString() === filtersObject.ROOMS || filtersObject.ROOMS === 'any') &&
      (item.offer.guests.toString() === filtersObject.GUESTS || filtersObject.GUESTS === 'any') &&
      filteredByFeatures);
  });
  return newOffers.slice(0, window.pin.amount);
};

/**
 * @description обработчик измениня значений фильтров
 */
var filtersChangeHandler = function () {
  window.card.remove();
  window.pin.remove();
  var offers = filterOffers(window.data.offers, Filter);
  window.pin.render(offers);
};

housingType.addEventListener('change', function () {
  Filter.TYPE = housingType.value;
  window.debounce(filtersChangeHandler);
});

housingPrice.addEventListener('change', function () {
  Filter.PRICE = housingPrice.value;
  window.debounce(filtersChangeHandler);
});

housingRooms.addEventListener('change', function () {
  Filter.ROOMS = housingRooms.value;
  window.debounce(filtersChangeHandler);
});

housingGuests.addEventListener('change', function () {
  Filter.GUESTS = housingGuests.value;
  window.debounce(filtersChangeHandler);
});

/**
 * @description формирует новый массив фич по выбранным в фильтре
 * @return {Array} массив фич
 */
var selectFeatures = function () {
  return housingFeatures.reduce(function (accumulator, item) {
    if (item.checked === true) {
      accumulator.push(item.value);
    }
    return accumulator;
  }, []);
};

housingFeatures.forEach(function (value) {
  value.addEventListener('change', function () {
    Filter.FEATURES = selectFeatures();
    window.debounce(filtersChangeHandler);
  });
});
