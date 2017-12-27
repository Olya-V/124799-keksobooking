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
    element.style.left = x + 'px';
    element.style.top = y + 'px';
  };

  var dragItem = function (element) {

    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.pageX - element.offsetLeft,
        y: evt.pageY - element.offsetTop
      };

      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        var elementCoords = {
          x: moveEvt.pageX - startCoords.x,
          y: moveEvt.pageY - startCoords.y
        };

        var elementStopCoords = {
          x: null,
          y: null
        };

        if ((elementCoords.y) < window.map.dragLimits.yMin ||
          (elementCoords.y) > window.map.dragLimits.yMax ||
          (elementCoords.x) < window.map.dragLimits.xMin ||
          (elementCoords.x) > window.map.dragLimits.xMax) {

          elementStopCoords.y = Math.min(Math.max(elementCoords.y, window.map.yMin), window.map.yMax);
          elementStopCoords.x = Math.max(Math.min(window.map.xMax, elementCoords.x), window.map.xMin);
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

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    getRandomElementNoRepeat: getRandomElementNoRepeat,
    getRandomArray: getRandomArray,
    dragItem: dragItem
  };
})();
