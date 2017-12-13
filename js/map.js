'use strict';
var AVATAR = {
  NUMBER_MIN: 1,
  NUMBER_MAX: 8
};
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира',
  'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PRICE = {
  MIN: 1000,
  MAX: 1000000
};
var TYPE = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var ROOMS = {
  MIN: 1,
  MAX: 5
};
var GUESTS = {
  MIN: 1,
  MAX: 100
};
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var LOCATION = {
  X_MIN: 300,
  X_MAX: 900,
  Y_MIN: 164,
  Y_MAX: 500
};

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var getRandomElement = function (arrayOfElements) {
  var randomIndex = getRandomNumber(0, arrayOfElements.length - 1);
  return arrayOfElements[randomIndex];
};

var getRandomElementNoRepeat = function (arrayOfElements) {
  var randomIndex = getRandomNumber(0, arrayOfElements.length - 1);
  return arrayOfElements.splice(randomIndex, 1);
};

var getRandomArray = function (arrayOfElements) {
  return arrayOfElements.slice(getRandomNumber(1, arrayOfElements.length - 1));
};

var createAuthorAvatars = function () {
  var avatars = [];
  for (var i = AVATAR.NUMBER_MIN; i <= AVATAR.NUMBER_MAX; i++) {
    avatars.push('img/avatars/user0' + i + '.png');
  }
  return avatars;
};

var createOneOffer = function (avatarsArray) {
  var coordinateX = getRandomNumber(LOCATION.X_MIN, LOCATION.X_MAX);
  var coordinateY = getRandomNumber(LOCATION.Y_MIN, LOCATION.Y_MAX);
  return {
    'author': {
      'avatar': getRandomElementNoRepeat(avatarsArray)
    },
    'offer': {
      'title': getRandomElementNoRepeat(TITLE),
      'address': coordinateX + ', ' + coordinateY,
      'price': getRandomNumber(PRICE.MIN, PRICE.MAX),
      'type': getRandomElement(Object.keys(TYPE)),
      'rooms': getRandomNumber(ROOMS.MIN, ROOMS.MAX),
      'guests': getRandomNumber(GUESTS.MIN, GUESTS.MAX),
      'checkin': getRandomElement(CHECKIN),
      'checkout': getRandomElement(CHECKOUT),
      'features': getRandomArray(FEATURES),
      'description': '',
      'photos': []
    },
    'location': {
      'x': coordinateX,
      'y': coordinateY
    }
  };
};

var createOffers = function (number) {
  var avatars = createAuthorAvatars();
  var offers = [];
  for (var i = 1; i <= number; i++) {
    var element = createOneOffer(avatars);
    offers.push(element);
  }
  return offers;
};

var offers = createOffers(AVATAR.NUMBER_MAX);

var showMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

var createPins = function (offersArray) {
  var template = document.querySelector('template').content.querySelector('button.map__pin');
  var fragment = document.createDocumentFragment();
  var pins = document.querySelector('.map__pins');
  var propertyAds = offersArray;
  for (var i = 0; i <= propertyAds.length - 1; i++) {
    var element = template.cloneNode(true);
    element.style.left = propertyAds[i].location.x + 'px';
    element.style.top = propertyAds[i].location.y + 'px';
    element.querySelector('img').src = propertyAds[i].author.avatar;
    fragment.appendChild(element);
  }
  pins.appendChild(fragment);
};

var changeFeatures = function (features, templateFeatures) {
  for (var i = 0; i <= features.length - 1; i++) {
    features[i] = 'feature--' + features[i];
  }
  for (var j = 0; j <= templateFeatures.length - 1; j++) {
    if (features.indexOf(templateFeatures[j].classList[1]) === -1) {
      templateFeatures[j].remove();
    }
  }
};

var createAd = function (adObject) {
  var template = document.querySelector('template').content.querySelector('article.map__card');
  var fragment = document.createDocumentFragment();
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');
  var element = template.cloneNode(true);
  element.querySelector('img').src = adObject.author.avatar;
  element.querySelector('h3').innerHTML = adObject.offer.title;
  element.querySelector('small').innerHTML = adObject.offer.address;
  element.querySelector('.popup__price').innerHTML = adObject.offer.price + ' &#x20bd;/ночь';
  element.querySelector('h4').innerHTML = TYPE[adObject.offer.type];
  element.querySelector('p:nth-of-type(3)').innerHTML = adObject.offer.rooms + ' комнат для ' + adObject.offer.guests + ' гостей';
  element.querySelector('p:nth-of-type(4)').innerHTML = 'Заезд после ' + adObject.offer.checkin + ', выезд до ' + adObject.offer.checkout;
  element.querySelector('p:nth-of-type(5)').innerHTML = adObject.offer.description;
  var templateFeaturesList = element.querySelectorAll('.feature');
  var featuresList = adObject.offer.features;
  changeFeatures(featuresList, templateFeaturesList);
  fragment.appendChild(element);
  map.insertBefore(fragment, mapFilters);
};


showMap();
createPins(offers);
createAd(offers[0]);

