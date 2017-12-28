'use strict';

// Создайте модуль show-card.js, экспортирующий в глобальную область видимости функцию showCard.
// Функция должна показывать карточку выбранного жилья по нажатию на метку на карте

(function () {
  window.showCard = function (offerObject) {
    var mapFilters = document.querySelector('.map__filters-container');
    var ad = window.card.createPopup(offerObject);
    window.data.map.insertBefore(ad, mapFilters);
    window.card.setFocus();
  };
})();


