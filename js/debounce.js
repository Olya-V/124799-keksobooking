'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  /**
   * @description устраняет дребезг при частом вызове той функции
   * @param {function} callback
   */
  var call = function (callback) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  };
  window.debounce = {
    call: call
  };
})();
