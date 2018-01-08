'use strict';

(function () {

  /**
   * @description синхронизирует значения двух полей
   * @param {*} firstElement
   * @param {*}  secondElement
   * @param {Array} firstValues
   * @param {Array} secondValues
   * @param {Function} callback
   */
  var synchronize = function (firstElement, secondElement, firstValues, secondValues, callback) {
    firstElement.addEventListener('change', function () {
      var valueElement1 = secondValues[firstValues.indexOf(firstElement.value)];
      callback(secondElement, valueElement1);
    });
    secondElement.addEventListener('change', function () {
      var valueElement2 = firstValues[secondValues.indexOf(secondElement.value)];
      callback(firstElement, valueElement2);
    });
  };
  window.synchronizeFields = {
    synchronize: synchronize
  };
})();
