'use strict';

(function () {
  var elementToMove = window.pin.pinMain;
  var movementArea = window.data.map;
  var dragLimits = {
    yMin: window.pin.pinLimits.Y_MIN,
    yMax: window.pin.pinLimits.Y_MAX,
    xMin: window.pin.pinMainParams.WIDTH / 2,
    xMax: elementToMove.parentNode.offsetWidth - window.pin.pinMainParams.WIDTH / 2
  };

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
  window.utils.dragItem(elementToMove);
  window.map = {
    elementToMove: elementToMove,
    dragLimits: dragLimits,
    movementArea: movementArea,
    showMap: showMap
  };
})();
