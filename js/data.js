'use strict';

(function () {
  var map = document.querySelector('section.map');
  var photoContainer = document.querySelector('.form__photo-container');
  var avatar = document.querySelector('.notice__preview img');
  var housingType = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var offers = [];
  window.data = {
    photoContainer: photoContainer,
    avatar: avatar,
    map: map,
    housingType: housingType,
    offers: offers
  };
})();

