'use strict';

(function () {
  var title = ['Большая уютная квартира', 'Маленькая неуютная квартира',
    'Огромный прекрасный дворец', 'Маленький ужасный дворец',
    'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var type = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var map = document.querySelector('section.map');
  var OBJECT_COUNT = 8;
  var PRICE = {
    MIN: 1000,
    MAX: 1000000
  };
  var ROOMS = {
    MIN: 1,
    MAX: 5
  };
  var GUESTS = {
    MIN: 1,
    MAX: 100
  };
  var LOCATION = {
    X_MIN: 300,
    X_MAX: 900,
    Y_MIN: 100,
    Y_MAX: 500
  };
  var PIN_CUSTOM = {
    HEIGHT: 64,
    WIDTH: 46
  };
  /**
   * @description возвращает ссылку на аватарку автора объявления
   * @param {number} i индекс объекта объявления, max индекс задается числом создаваемых объектов
   * @return {string} строку с адресом картинки аватарки
   */
  var createAvatarUrl = function (i) {
    return 'img/avatars/user0' + [i + 1] + '.png';
  };

  /**
   * @description создает объект объявление
   * @param {number} i индекс объекта объявления, max индекс задается числом создаваемых объектов
   * @return {object} объект объявление
   */
  var createOffer = function (i) {
    var coordinateX = window.utils.getRandomNumber(LOCATION.X_MIN, LOCATION.X_MAX);
    var coordinateY = window.utils.getRandomNumber(LOCATION.Y_MIN, LOCATION.Y_MAX);
    return {
      'author': {
        'avatar': createAvatarUrl(i)
      },
      'offer': {
        'title': window.utils.getRandomElementNoRepeat(title),
        'address': coordinateX + ', ' + coordinateY,
        'price': window.utils.getRandomNumber(PRICE.MIN, PRICE.MAX),
        'type': window.utils.getRandomElement(Object.keys(type)),
        'rooms': window.utils.getRandomNumber(ROOMS.MIN, ROOMS.MAX),
        'guests': window.utils.getRandomNumber(GUESTS.MIN, GUESTS.MAX),
        'checkin': window.utils.getRandomElement(checkin),
        'checkout': window.utils.getRandomElement(checkout),
        'features': window.utils.getRandomArray(features),
        'description': '',
        'photos': []
      },
      'location': {
        'x': coordinateX - PIN_CUSTOM.WIDTH / 2,
        'y': coordinateY - PIN_CUSTOM.HEIGHT
      }
    };
  };

  /**
   * @description создает массив с объектами обяъвлений
   * @param {Number} numberOfObjects максимальное количество объектов
   * @return {Array} массив с объектами обяъвлений
   */
  var getOffersArray = function (numberOfObjects) {
    var offersArray = [];
    for (var j = 0; j < numberOfObjects; j++) {
      offersArray.push(createOffer(j));
    }
    return offersArray;
  };
  window.data = {
    map: map,
    type: type,
    getOffers: getOffersArray(OBJECT_COUNT)
  };
})();

