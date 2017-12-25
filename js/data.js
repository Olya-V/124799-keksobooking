'use strict';
(function () {
  var title = ['Большая уютная квартира', 'Маленькая неуютная квартира',
    'Огромный прекрасный дворец', 'Маленький ужасный дворец',
    'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

  var type = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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
    Y_MIN: 164,
    Y_MAX: 500
  };

  /**
   * @description возвращает случайное число от min до max, всключая max
   * @param {number} min
   * @param {number} max
   * @return {number} случайное число
   */
  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
  };

  /**
   * @description возвращает случайный элемент массива по рандомному индексу, элементы могут повторяться
   * @param {array} arrayOfElements
   * @return {*} рандомный элемент массива
   */
  var getRandomElement = function (arrayOfElements) {
    var randomIndex = getRandomNumber(0, arrayOfElements.length - 1);
    return arrayOfElements[randomIndex];
  };

  /**
   * @description возвращает случайный элемент массива по рандомному индексу, элементы не повторяются
   * @param {array} arrayOfElements
   * @return {*} рандомный элемент массива
   */
  var getRandomElementNoRepeat = function (arrayOfElements) {
    var randomIndex = getRandomNumber(0, arrayOfElements.length - 1);
    return arrayOfElements.splice(randomIndex, 1);
  };

  /**
   * @description возвращает массив случайной длинны исходя из переданного массива
   * @param {array} arrayOfElements исходный массив данных
   * @return {array} новый массив
   */
  var getRandomArray = function (arrayOfElements) {
    return arrayOfElements.slice(getRandomNumber(1, arrayOfElements.length - 1));
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
    var coordinateX = getRandomNumber(LOCATION.X_MIN, LOCATION.X_MAX);
    var coordinateY = getRandomNumber(LOCATION.Y_MIN, LOCATION.Y_MAX);
    return {
      'author': {
        'avatar': createAvatarUrl(i)
      },
      'offer': {
        'title': getRandomElementNoRepeat(title),
        'address': coordinateX + ', ' + coordinateY,
        'price': getRandomNumber(PRICE.MIN, PRICE.MAX),
        'type': getRandomElement(Object.keys(type)),
        'rooms': getRandomNumber(ROOMS.MIN, ROOMS.MAX),
        'guests': getRandomNumber(GUESTS.MIN, GUESTS.MAX),
        'checkin': getRandomElement(checkin),
        'checkout': getRandomElement(checkout),
        'features': getRandomArray(features),
        'description': '',
        'photos': []
      },
      'location': {
        'x': coordinateX,
        'y': coordinateY
      }
    };
  };

  /**
   * @description создат массив с объектами обяъвлений
   * @return массив с объектами обяъвлений
   */
  window.data = {
    offers: function () {
      var offersArray = [];
      for (var j = 0; j < OBJECT_COUNT; j++) {
        offersArray.push(createOffer(j));
      }
      return offersArray;
    }
  };
})();
