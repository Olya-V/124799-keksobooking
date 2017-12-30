'use strict';

(function () {
  /**
   * @description синхронизирует значения двух полей
   * @param {*} element1
   * @param {*}  element2
   * @param {Array} arrayOfValue1
   * @param {Array}arrayOfValue2
   * @param {Function} callback
   */
  var call = function (element1, element2, arrayOfValue1, arrayOfValue2, callback) {
    element1.addEventListener('change', function () {
      var valueElement1 = arrayOfValue2[arrayOfValue1.indexOf(element1.value)];
      callback(element2, valueElement1);
    });
    element2.addEventListener('change', function () {
      var valueElement2 = arrayOfValue1[arrayOfValue2.indexOf(element2.value)];
      callback(element1, valueElement2);
    });
  };
  window.synchronizeFields = {
    call: call
  };
})();
