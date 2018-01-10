'use strict';

(function () {

  /**
   * @description показыает карточку объявления
   * @param {Object} offerObject
   */
  var show = function (offerObject) {
    var mapFilters = document.querySelector('.map__filters-container');
    var ad = window.card.create(offerObject);
    window.data.map.insertBefore(ad, mapFilters);
    window.card.setFocus();
    document.addEventListener('click', window.card.closeButtonClickHandler);
    document.addEventListener('keydown', window.card.popupEscKeydownHandler);
  };

  window.showCard = {
    show: show
  };
})();


