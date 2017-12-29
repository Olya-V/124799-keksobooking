'use strict';

(function () {
  var map = document.querySelector('section.map');
  var type = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  window.data = {
    map: map,
    type: type
  };
})();

