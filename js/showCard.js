'use strict';

(function () {
  /**
   * @description показыает карточку объявления
   * @param {Object} offerObject
   */
  var call = function (offerObject) {
    var mapFilters = document.querySelector('.map__filters-container');
    var ad = window.card.create(offerObject);
    window.data.map.insertBefore(ad, mapFilters);
    window.card.setFocus();
  };

  window.showCard = {
    call: call
  };
})();


