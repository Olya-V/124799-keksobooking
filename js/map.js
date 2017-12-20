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

var map = document.querySelector('section.map');
var form = document.querySelector('form.notice__form');
var fields = document.querySelectorAll('form.notice__form fieldset');
var mapPinMainKeks = document.querySelector('.map__pin--main');
var pinsBlock = document.querySelector('div.map__pins');

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
var ESC_KEYCODE = 27;

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

/* offers {array} массив с объектами обяъвлений
 * OBJECT_COUNT {number} количество объявлений
 */
var offers = [];
for (var j = 0; j < OBJECT_COUNT; j++) {
  offers.push(createOffer(j));
}

/**
 * @description из списка всех возможных фич оставляет только те, которые есть в объекте объявление.
 * @param {array} objectFeatures массив фич объекта объявление
 * @param {*} templateFeatures коллекция DOM-узлов - элементы <li> из списка <ul class="popup__features">
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
 * @description перед .map__filters-container отрисовывает новый DOM-элемен popup
 * @param {object} offerObject объект обявление -  один элемент из массива объявлений @see offers
 */
var createPopup = function (offerObject) {
  var templateAd = document.querySelector('template').content.querySelector('article.map__card');
  var elementAd = templateAd.cloneNode(true);
  var fragmentAd = document.createDocumentFragment();
  var mapFilters = document.querySelector('.map__filters-container');
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

/**
 * @description создает DOM-элемен - пин
 * @param {object} offer объект обявление - элемент из массива объявлений @see offers
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

/**
 * @description обработчик клика по пину.
 * @param {object} evt
 */
var pinClickHandler = function (evt) {
  disablePin();
  deleteOpenedPopup();
  createPopup(offers[activatePin(evt)]);
  setFocus();
};

/**
 * создает пины на основе объекта объявление - элемент массива @see offers во fragment,
 * пины отрисовываются в блоке .map__pins
 */
var fragmentPins = document.createDocumentFragment();
for (var k = 0; k < offers.length; k++) {
  var newPin = createPin(offers[k]);
  newPin.classList.add('hidden');
  newPin.setAttribute('data-id', k);
  newPin.addEventListener('click', pinClickHandler);
  fragmentPins.appendChild(newPin);
}
pinsBlock.appendChild(fragmentPins);

/**
 * @description убирает класс .hidden у пинов,
 */
var showPins = function () {
  var hidenPins = document.querySelectorAll('button.map__pin.hidden');

  for (var g = 0; g < hidenPins.length; g++) {
    hidenPins[g].classList.remove('hidden');
  }
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
 * @description активирует пин при нажатии (пин подсвечивается)
 * @param {object} evt
 * @return {object} активный пин (button), по которому кликнули/нажали
 */
var activatePin = function (evt) {
  var activePin = null;
  if (evt.target.tagName === 'IMG') {
    activePin = evt.target.parentNode;
    activePin.classList.add('map__pin--active');
    return activePin.dataset.id;
  } else {
    activePin = evt.target;
    activePin.classList.add('map__pin--active');
    return activePin.dataset.id;
  }
};

/**
 * @description затемняет блок .map
 */
var fadeMap = function () {
  map.classList.add('map--faded');
};

/**  @description показывает блок .map--faded
 */
var showMap = function () {
  map.classList.remove('map--faded');
};

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
 * @description обработчик события клик по метке с кексом
 * @constructor
 */
var KeksPinClickHandler = function () {
  showMap();
  activateForm();
  showPins();
};

/**
 * @description устанавливает фокус на кнопке закрытия popup
 */
var setFocus = function () {
  var popup = document.querySelector('.popup');
  var closeButton = popup.children[1];
  closeButton.focus();
};

/**
 * @description удаляет открые ранее popup
 */
var deleteOpenedPopup = function () {
  var openedPopup = document.querySelector('.popup');

  if (openedPopup) {
    map.removeChild(openedPopup);
  }
};


/**
 * @description обработчик события клик по кнопке закрытия открытого popup с обяъвлением.
 * @param {object} evt
 */
var closeButtonClickHandler = function (evt) {
  if (evt.target.classList[0] === 'popup__close') {
    evt.target.parentNode.classList.add('hidden');
    disablePin();
  }
};

/**
 * @description обработчик события нажатия кнопки Esc, когда есть открытый popup с обяъвлением.
 * @param {object} evt
 */
var popupEscKeydownHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    var popup = document.querySelector('.popup:not(.hidden)');
    popup.classList.add('hidden');
    disablePin();
  }
};

mapPinMainKeks.addEventListener('mouseup', KeksPinClickHandler);

document.addEventListener('click', closeButtonClickHandler);

document.addEventListener('keydown', popupEscKeydownHandler);

fadeMap();
disableForm();
