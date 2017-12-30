'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking';
  /**
   * @description формируе запрос на сервер
   * @param {function} onLoad
   * @param {function} onError
   * @return {XMLHttpRequest}
   */
  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };
  /**
   * @description загружает данные с сервера
   * @param {*} data
   * @param {function} onLoad
   * @param {function} onError
   */
  var upload = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  };
  /**
   * @description отправляет данные на сервер
   * @param {function} onLoad
   * @param {function} onError
   */
  var download = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  };
  window.backend = {
    upload: upload,
    download: download
  };
})();
