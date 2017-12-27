'use strict';

(function () {
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
    showMap: showMap
  };


  // П Е Р Е Т А С К И В А Н И Е

  var pinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var PIN_HEIGHT = 87;
  var PIN_WIDTH = 65;

  /**
   * @description назначает координаты для пина
   * @param {number} x
   * @param {number} y
   */
  var assignPinCoords = function (x, y) {
    pinMain.style.top = y + 'px';
    pinMain.style.left = x + 'px';
  };

  /**
   * @description отображате адрес в поле
   * @param {number} x
   * @param {number} y
   */
  var assignAddress = function (x, y) {
    address.value = 'x: ' + (x + (PIN_WIDTH / 2)) + ', y: ' + (y + PIN_HEIGHT);
  };

  /**
   * @description обработчик перетаскивания пина
   */
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var pinCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      if (pinCoords.y <= window.data.location.Y_MIN ||
        pinCoords.y >= window.data.location.Y_MAX ||
        pinCoords.x <= (PIN_WIDTH / 2) ||
        pinCoords.x >= document.documentElement.clientWidth - (PIN_WIDTH / 2)) {

        pinCoords.y = Math.min(Math.max(pinCoords.y, window.data.location.Y_MIN), window.data.location.Y_MAX);
        pinCoords.x = Math.max(Math.min(document.documentElement.clientWidth - (PIN_WIDTH / 2), pinCoords.x), (PIN_WIDTH / 2));

        window.data.map.removeEventListener('mousemove', mouseMoveHandler);
        window.data.map.removeEventListener('mouseup', mouseUpHandler);

        assignPinCoords(pinCoords.x, pinCoords.y);
        assignAddress(pinCoords.x, pinCoords.y);
      }
      assignPinCoords(pinCoords.x, pinCoords.y);
      assignAddress(pinCoords.x, pinCoords.y);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      window.data.map.removeEventListener('mousemove', mouseMoveHandler);
      window.data.map.removeEventListener('mouseup', mouseUpHandler);
    };

    window.data.map.addEventListener('mousemove', mouseMoveHandler);
    window.data.map.addEventListener('mouseup', mouseUpHandler);
  });
})();
