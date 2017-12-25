'use strict';

(function () {
  window.utils = {
    /**
     * @description возвращает случайное число от min до max, всключая max
     * @param {number} min
     * @param {number} max
     * @return {number} случайное число
     */
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max - min));
    },

    /**
     * @description возвращает случайный элемент массива по рандомному индексу, элементы могут повторяться
     * @param {array} arrayOfElements
     * @return {*} рандомный элемент массива
     */
    getRandomElement: function (arrayOfElements) {
      var randomIndex = this.getRandomNumber(0, arrayOfElements.length - 1);
      return arrayOfElements[randomIndex];
    },

    /**
     * @description возвращает случайный элемент массива по рандомному индексу, элементы не повторяются
     * @param {array} arrayOfElements
     * @return {*} рандомный элемент массива
     */
    getRandomElementNoRepeat: function (arrayOfElements) {
      var randomIndex = this.getRandomNumber(0, arrayOfElements.length - 1);
      return arrayOfElements.splice(randomIndex, 1);
    },

    /**
     * @description возвращает массив случайной длинны исходя из переданного массива
     * @param {array} arrayOfElements исходный массив данных
     * @return {array} новый массив
     */
    getRandomArray: function (arrayOfElements) {
      return arrayOfElements.slice(this.getRandomNumber(1, arrayOfElements.length - 1));
    }
  };
})();
