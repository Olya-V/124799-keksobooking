'use strict';

(function () {
  var elementToMove = window.pin.main;
  var movementArea = window.data.map;
  var DragLimits = {
    Y_MIN: window.pin.limits.Y_MIN,
    Y_MAX: window.pin.limits.Y_MAX,
    X_MIN: window.pin.parameters.WIDTH / 2,
    X_MAX: elementToMove.parentNode.offsetWidth - window.pin.parameters.WIDTH / 2
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
    dragLimits: DragLimits,
    movementArea: movementArea,
    show: show
  };
})();
