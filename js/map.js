'use strict';

(function () {
  var map = document.querySelector('section.map');

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

  fadeMap();
  window.map = {
    showMap: showMap
  };
})();
