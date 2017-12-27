'use strict';

(function () {
  var mapOffset = document.querySelector('section.map').offsetLeft;
  var yMin = window.pin.pinLimits.Y_MIN;
  var yMax = window.pin.pinLimits.Y_MAX;
  var xMin = mapOffset + (window.pin.pinMainParams.WIDTH);
  var xMax = (document.documentElement.clientWidth - mapOffset - (window.pin.pinMainParams.WIDTH));
  var movementArea = window.data.map;
  var elementToMove = window.pin.pinMain;
  /**
   * @description затемняет блок .map
   */
  var fadeMap = function () {
    window.data.map.classList.add('map--faded');
  };

  /**  @description показывает блок .map--faded
   */
  var showMap = function () {
    window.data.map.classList.remove('map--faded');
  };

  fadeMap();
  window.map = {
    mapOffset: mapOffset,
    yMin: yMin,
    yMax: yMax,
    xMin: xMin,
    xMax: xMax,
    movementArea: movementArea,
    elementToMove: elementToMove,
    showMap: showMap
  };
})();
