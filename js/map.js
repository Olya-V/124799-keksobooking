'use strict';

(function () {
  var elementToMove = window.pin.main;
  var movementArea = window.data.map;
  var dragLimits = {
    yMin: window.pin.limits.Y_MIN,
    yMax: window.pin.limits.Y_MAX,
    xMin: window.pin.parameters.WIDTH / 2,
    xMax: elementToMove.parentNode.offsetWidth - window.pin.parameters.WIDTH / 2
  };

  /**
   * @description затемняет блок .map
   */
  var fade = function () {
    window.data.map.classList.add('map--faded');
  };

  /**  @description показывает блок .map--faded
   */
  var show = function () {
    window.data.map.classList.remove('map--faded');
  };

  fade();
  window.utils.dragItem(elementToMove);
  window.map = {
    elementToMove: elementToMove,
    dragLimits: dragLimits,
    movementArea: movementArea,
    show: show
  };
})();
