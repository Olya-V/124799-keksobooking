'use strict';

var randomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var numberOfAds = 8;

var generateAvatarNumbers = function (number) {
  var numbers = [];
  for (var i = 1; i <= number; i++) {
    numbers.push('0' + i);
  }
  return numbers;
};

var avatarNumbers = generateAvatarNumbers(numberOfAds);

var author = {};
author.avatar = 'img/avatars/user{{' + avatarNumbers.shift() + '}}.png';

var location = {};
location.x = randomNumber(300, 900);
location.y = randomNumber(100, 500);

var title = ['Большая уютная квартира', 'Маленькая неуютная квартира',
  'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var address = '{{' + location.x + '}}, {{' + location.y + '}}';
var price = randomNumber(1000, 1000000);
var type = ['flat', 'house', 'bungalo'];
var rooms = randomNumber(1, 5);
var guests = randomNumber(1, 10);
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var offer = {};
offer.title = title.shift();
offer.address = address;
offer.price = price;
offer.type = type[randomNumber(0, type.length - 1)];
offer.rooms = rooms;
offer.guests = guests;
offer.checkin = checkin[randomNumber(0, type.length - 1)];
offer.checkout = checkout[randomNumber(0, type.length - 1)];
offer.features = features.slice(randomNumber(1, type.length - 1));
offer.description = '';
offer.photos = [];

var showMap = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
};

var createPins = function () {
  showMap();
  var fragment = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins');
  /*
  <button style="left: {{location.x}}px; top: {{location.y}}px;" class="map__pin">
    <img src="{{author.avatar}}" width="40" height="40" draggable="false">
  </button>
  */
  for (var i = 1; i <= numberOfAds; i++) {
    var locationX = location.x + 20;
    var locationY = location.y + 40;
    var avatar = author.avatar;
    var element = '<button style=\"left: {{' + locationX + '}}px; top: {{' + locationY + '}}px;\" class=\"map__pin\"><img src=\"{{' + avatar + '}}" width=\"40\" height=\"40\" draggable=\"false\"></button>';
    fragment.appendChild(element);
  }
  mapPins.appendChild(fragment);
};

createPins();
