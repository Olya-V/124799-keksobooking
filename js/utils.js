'use strict';

(function () {

  /**
   *  @description проверяет лимиты при определнии конечных координат элемента
   * @param {number} x - координаты элемента
   * @param {number} y -  координаты элемента
   * @param {number} xMax - ограничения движения элемента
   * @param {number} xMin - ограничения движения элемента
   * @param {number} yMax - ограничения движения элемента
   * @param {number} yMin - ограничения движения элемента
   * @return {Array} координаты элемента
   */

  var checkLimits = function (x, y, xMax, xMin, yMax, yMin) {
    var positionX = x;
    var positionY = y;
    if (y <= yMin || y >= yMax || x <= xMin || x >= xMax) {
      positionX = Math.max(Math.min(xMax, x), xMin);
      positionY = Math.min(Math.max(y, yMin), yMax);
    }
    return [positionX, positionY];
  };

  /**
   * @description назначает координаты элементу при перемещении
   * @param {*} element перемещаемый DOM-элемент
   * @param {number} x
   * @param {number} y
   */
  var setCoordinates = function (element, x, y) {
    element.style.left = x + 'px';
    element.style.top = y + 'px';
  };

  /**
   * @description перетаскивает элемент в заданых границах
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
        var position = {
          x: moveEvt.pageX - clickOffset.x,
          y: moveEvt.pageY - clickOffset.y
        };
        var finalPosition = checkLimits(position.x, position.y, window.map.dragLimits.xMax, window.map.dragLimits.xMin, window.map.dragLimits.yMax, window.map.dragLimits.yMin);
        setCoordinates(element, finalPosition[0], finalPosition[1]);
        window.form.assignAddress(finalPosition[0], finalPosition[1]);
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

  /**
   * @description присваивает значение элементу
   * @param {*} element
   * @param {*} value
   */
  var syncValues = function (element, value) {
    element.value = value;
  };

  /**
   * @description присваивает минимальное значение элементу
   * @param {*} element
   * @param {*} value
   */
  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  /**
   * @description получает данные о схожих объявлениях с сервера
   * @param {Array} data массив данных с сервера со схожими объявлениями
   */
  var successHandler = function (data) {
    window.data.offers = data;
  };

  /**
   * @description показывает сообщение с ошибкой на странице
   * @param {String} errorMessage
   */
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
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
