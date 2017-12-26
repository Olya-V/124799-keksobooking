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

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    getRandomElementNoRepeat: getRandomElementNoRepeat,
    getRandomArray: getRandomArray
  };
})();
