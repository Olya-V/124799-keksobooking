'use strict';

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
 * @description возвращает случайное число от переданных min до max, всключая max
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
 * @description возвращает случайный элемент массива по рандомному индексу, при этом элементы не повторяются,
 * что обеспечивается удалением возвращенных элементов из массива
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
 * @description возвращает ссылку на аватарку автора объявления,
 * используется при создании объекта объявление @see createOneOffer
 * @param {number} i индекс объекта объявления, max индекс задается числом создаваемых объектов
 * @return {string} строку с адресом картинки аватарки
 */
var createAvatarUrl = function (i) {
  return 'img/avatars/user0' + [i + 1] + '.png';
};

/**
 * @description создает и возвращет объект объявление
 * @param {number} i индекс объекта объявления, max индекс задается числом создаваемых объектов
 * @return {object} объект объявление
 */
var createOneOffer = function (i) {
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

/* Используем функцию создания одного объявления createOneOffer
 * OBJECT_COUNT {number} исходя из необходимого количества объявлений, генерируем объеты объявление в цикле
 * offers {array} сохраняем в переменную offers массив объектов объявления
 */
var offers = [];
for (var j = 0; j < OBJECT_COUNT; j++) {
  offers.push(createOneOffer(j));
}

/**  @description показывает блок .map--faded
 */
var showMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

/**
 * @description на основании шаблона button.map__pin создает новый DOM-элемен - пин с уникальными координатами
 * и ссылкой на картинку аватарки автора объявления
 * @param {object} offer принимает как параметр один объект обявление из массива объявлений @see offers
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

/* используем функцию создания одного пина createPin
 * offers {array} исходя из количества объявлений в массиве объектов объявления,
 * генерируем нужно количество пинов и вставляем их в новый fragment
 * отрисовываем все созданные пины в блоке .map__pins
 */
var pins = document.querySelector('.map__pins');
var fragmentPins = document.createDocumentFragment();
for (var k = 0; k < offers.length; k++) {
  fragmentPins.appendChild(createPin(offers[k]));
}
pins.appendChild(fragmentPins);

/**
 * @description принимает в качестве параметров:
 * objectFeatures - массив фич объекта объявление (offerObject.offer.features), выглядит как ['wifi', 'elevator']
 *
 * templateFeatures - коллекция DOM-узлов - элементы <li> из списка <ul class="popup__features">,
 * выглядит как [li.feature.feature--wifi, li.feature.feature--dishwasher]
 *
 * В первом цикле преобразуем элементы массива фич объекта к виду 'feature--(название фичи)', например ['feature--wifi', 'feature--elevator']
 *
 * Во втором цикле:
 * метод classList для одного DOM-узла <li> возвращает массив ["feature", "feature--wifi", value: "feature feature--wifi"]
 * Сравниваем наличие первого элемента "feature--wifi" этого DOM-узла в списке фич объекта,
 * если такая фича есть в объекте, оставляем DOM-узел списка фич,
 * если нет - удаляем.
 * @param {array} objectFeatures массив фич объекта объявление
 * @param {*} templateFeatures элементы <li> из списка <ul class="popup__features">
 * возвращает отредактированное количетсво DOM-нод <li> - список фич
 */
var changeFeatures = function (objectFeatures, templateFeatures) {
  for (var f = 0; f < objectFeatures.length; f++) {
    objectFeatures[f] = 'feature--' + objectFeatures[f];
  }
  for (var t = 0; t < templateFeatures.length; t++) {
    if (objectFeatures.indexOf(templateFeatures[t].classList[1]) === -1) {
      templateFeatures[t].remove();
    }
  }
};

/**
 * @description на основании шаблона article.map__card отрисовывает popup с объявлением
 * @param {object} offerObject один объект обявление из массива объявлений @see offers
 */
var createOfferPopup = function (offerObject) {
  var templateAd = document.querySelector('template').content.querySelector('article.map__card');
  var fragmentAd = document.createDocumentFragment();
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');
  var elementAd = templateAd.cloneNode(true);

  elementAd.querySelector('img').src = offerObject.author.avatar;
  elementAd.querySelector('h3').innerHTML = offerObject.offer.title;
  elementAd.querySelector('small').innerHTML = offerObject.offer.address;
  elementAd.querySelector('.popup__price').innerHTML = offerObject.offer.price + ' &#x20bd;/ночь';
  elementAd.querySelector('h4').innerHTML = type[offerObject.offer.type];
  elementAd.querySelector('p:nth-of-type(3)').innerHTML = offerObject.offer.rooms + ' комнат для ' + offerObject.offer.guests + ' гостей';
  elementAd.querySelector('p:nth-of-type(4)').innerHTML = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;
  elementAd.querySelector('p:nth-of-type(5)').innerHTML = offerObject.offer.description;

  var templateFeaturesList = elementAd.querySelectorAll('.feature');
  var featuresList = offerObject.offer.features;
  changeFeatures(featuresList, templateFeaturesList);
  fragmentAd.appendChild(elementAd);
  map.insertBefore(fragmentAd, mapFilters);
};

showMap();
createOfferPopup(offers[0]);
