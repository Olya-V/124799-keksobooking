'use strict';

(function () {
  /**
   * @description назначает координаты элементу при перемещении
   * @param {*} element перемещаемый DOM-элемент
   * @param {number} x
   * @param {number} y
   */
  var assignElementsCoords = function (element, x, y) {
    element.style.left = x + 'px';
    element.style.top = y + 'px';
  };

  /**
   * @description перетаскивает элемент в заданых на карте границах
   * @param {*} element перетаскиваемый DOM-элемент
   */
  var dragItem = function (element) {
    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      // по точке клика находим смещение до левого верхнего угла элемента
      var clickOffset = {
        x: evt.pageX - element.offsetLeft,
        y: evt.pageY - element.offsetTop
      };

      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();
        // для определения координат элемента при перемещении мышкой отнимаем смещение
        var elementCoords = {
          x: moveEvt.pageX - clickOffset.x,
          y: moveEvt.pageY - clickOffset.y
        };

        var elementStopCoords = {
          x: 0,
          y: 0
        };
        if ((elementCoords.y) <= window.map.dragLimits.yMin ||
          (elementCoords.y) >= window.map.dragLimits.yMax ||
          (elementCoords.x) <= window.map.dragLimits.xMin ||
          (elementCoords.x) >= window.map.dragLimits.xMax) {

          elementStopCoords.y = Math.min(Math.max(elementCoords.y, window.map.dragLimits.yMin), window.map.dragLimits.yMax);
          elementStopCoords.x = Math.max(Math.min(window.map.dragLimits.xMax, elementCoords.x), window.map.dragLimits.xMin);
        } else {
          elementStopCoords.y = elementCoords.y;
          elementStopCoords.x = elementCoords.x;
        }
        assignElementsCoords(element, elementStopCoords.x, elementStopCoords.y);
        window.form.assignAddress(elementStopCoords.x, elementStopCoords.y);
      };

      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();

        window.map.movementArea.removeEventListener('mousemove', mouseMoveHandler);
        window.map.movementArea.removeEventListener('mouseup', mouseUpHandler);
      };

      window.map.movementArea.addEventListener('mousemove', mouseMoveHandler);
      window.map.movementArea.addEventListener('mouseup', mouseUpHandler);
    });
  };
  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    var message = document.createElement('p');
    node.style.zIndex = 100;
    node.style.margin = '0 auto';
    node.style.backgroundColor = 'rgba(255,255,255, 0.8)';
    node.style.textAlign = 'center';
    node.style.position = 'absolute';
    node.style.width = '550px';
    node.style.height = '550px';
    node.style.borderRadius = '50%';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '50px';
    message.style.paddingTop = '180px';
    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    node.appendChild(message);
  };

  window.utils = {
    dragItem: dragItem,
    syncValues: syncValues,
    syncValueWithMin: syncValueWithMin,
    errorHandler: errorHandler
  };
})();
