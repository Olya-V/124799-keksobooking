'use strict';

(function () {
  /**
   * @description возвращает случайное число от min до max, всключая max
   * @param {number} min
   * @param {number} max
   * @return {number} случайное число
   */
  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
  };

  /**
   * @description возвращает случайный элемент массива по рандомному индексу, элементы могут повторяться
   * @param {array} arrayOfElements
   * @return {*} рандомный элемент массива
   */
  var getRandomElement = function (arrayOfElements) {
    var randomIndex = getRandomNumber(0, arrayOfElements.length - 1);
    return arrayOfElements[randomIndex];
  };

  /**
   * @description возвращает случайный элемент массива по рандомному индексу, элементы не повторяются
   * @param {array} arrayOfElements
   * @return {*} рандомный элемент массива
   */
  var getRandomElementNoRepeat = function (arrayOfElements) {
    var randomIndex = getRandomNumber(0, arrayOfElements.length - 1);
    return arrayOfElements.splice(randomIndex, 1);
  };

  /**
   * @description возвращает массив случайной длинны исходя из переданного массива
   * @param {array} arrayOfElements исходный массив данных
   * @return {array} новый массив
   */
  var getRandomArray = function (arrayOfElements) {
    return arrayOfElements.slice(getRandomNumber(1, arrayOfElements.length - 1));
  };

  /**
   * @description назначает координаты элементу
   * @param {*} element перемещаемый DOM-элемент
   * @param {number} x
   * @param {number} y
   */
  var assignElementsCoords = function (element, x, y) {
    element.style.left = (element.offsetLeft - x) + 'px';
    element.style.top = (element.offsetTop - y) + 'px';
  };

  var assignFinalElementsCoords = function (element, x, y) {
    element.style.left = x + 'px';
    element.style.top = y + 'px';
  };
  /**
   * @description обработчик перемещения объекта мышью
   * @param {object} evt
   */
  /*
  var mouseMovementHandler = function (evt) {
    evt.preventDefault();

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var elementCoords = {
        x: moveEvt.pageX - window.map.mapOffset,
        y: moveEvt.pageY
      };

      if (elementCoords.y <= window.map.yMin ||
        elementCoords.y >= window.map.yMax ||
        elementCoords.x <= window.map.xMin ||
        elementCoords.x >= window.map.xMax) {
        elementCoords.y = Math.min(Math.max(elementCoords.y, window.map.yMin), window.map.yMax);
        elementCoords.x = Math.max(Math.min(window.map.xMax, elementCoords.x), window.map.xMin);

        assignElementsCoords(window.map.elementToMove, elementCoords.x, elementCoords.y);
        window.form.assignAddress(elementCoords.x, elementCoords.y);

        window.map.movementArea.removeEventListener('mousemove', mouseMoveHandler);
        window.map.movementArea.removeEventListener('mouseup', mouseUpHandler);
      }

      assignElementsCoords(window.map.elementToMove, elementCoords.x, elementCoords.y);
      window.form.assignAddress(elementCoords.x, elementCoords.y);

    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      window.map.movementArea.removeEventListener('mousemove', mouseMoveHandler);
      window.map.movementArea.removeEventListener('mouseup', mouseUpHandler);
    };

    window.map.movementArea.addEventListener('mousemove', mouseMoveHandler);
    window.map.movementArea.addEventListener('mouseup', mouseUpHandler);
  };
  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    getRandomElementNoRepeat: getRandomElementNoRepeat,
    getRandomArray: getRandomArray,
    mouseMovementHandler: mouseMovementHandler
  };
  */

  var mouseMovementHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };
      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      // console.log(startCoords.x, startCoords.y);
      // console.log(moveEvt);

      if ((startCoords.y) <= window.map.yMin ||
        (startCoords.y) >= window.map.yMax ||
        (startCoords.x) <= window.map.xMin ||
        (startCoords.x) >= window.map.xMax) {

        window.map.movementArea.removeEventListener('mousemove', mouseMoveHandler);
        window.map.movementArea.removeEventListener('mouseup', mouseUpHandler);
      }

      assignElementsCoords(window.map.elementToMove, shift.x, shift.y);
      window.form.assignAddress(startCoords.x, startCoords.y);

    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      window.map.movementArea.removeEventListener('mousemove', mouseMoveHandler);
      window.map.movementArea.removeEventListener('mouseup', mouseUpHandler);
    };

    window.map.movementArea.addEventListener('mousemove', mouseMoveHandler);
    window.map.movementArea.addEventListener('mouseup', mouseUpHandler);
  };
  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    getRandomElementNoRepeat: getRandomElementNoRepeat,
    getRandomArray: getRandomArray,
    mouseMovementHandler: mouseMovementHandler
  };

})();
