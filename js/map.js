'use strict';

(function () {
  var elementToMove = window.pin.pinMain;
  var dragLimits = {
    yMin: window.pin.pinLimits.Y_MIN,
    yMax: window.pin.pinLimits.Y_MAX,
    xMin: window.pin.pinMainParams.WIDTH / 2,
    xMax: elementToMove.parentNode.offsetWidth - window.pin.pinMainParams.WIDTH / 2
  };
  var movementArea = window.data.map;

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
  window.utils.dragItem(window.pin.pinMain);
  window.map = {
    dragLimits: dragLimits,
    movementArea: movementArea,
    elementToMove: elementToMove,
    showMap: showMap
  };
})();
