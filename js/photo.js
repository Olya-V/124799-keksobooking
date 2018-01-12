'use strict';

(function () {
  var TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var chooserContainter = document.querySelector('.form__photo-container .upload');
  var chooser = document.querySelector('#images');

  chooser.setAttribute('multiple', 'true');
  chooserContainter.style.width = '140px';
  chooserContainter.style.marginBottom = '3px';
  window.data.photoContainer.style.width = '460px';
  window.data.photoContainer.style.display = 'flex';
  window.data.photoContainer.style.flexWrap = 'wrap';
  window.data.photoContainer.style.listStyle = 'none';

  /**
   * @description отображает загруженное фото
   * @param {Object} uploadEvt
   */
  var setPhoto = function (uploadEvt) {
    var preview = window.data.photoContainer.insertAdjacentElement('beforeend', document.createElement('IMG'));
    preview.src = uploadEvt.target.result;
    preview.style.width = '80px';
    preview.style.height = '70px';
    preview.style.marginLeft = '10px';
    preview.style.marginRight = '10px';
    preview.style.marginBottom = '10px';
    preview.style.borderRadius = '3px';
  };

  /**
   * @description обработчик загрузки фоторграфий в форме подачи объявления
   * @param {Object} evt
   */
  var photoSelectHandler = function (evt) {
    var files = evt.target.files;

    for (var j = 0; j < files.length; j++) {
      var name = files[j].name.toLowerCase();
      if (window.utils.checkFileFormat(name, TYPES)) {
        window.utils.loadMultipleFiles(files[j], setPhoto);
      }
    }
  };

  chooser.addEventListener('change', photoSelectHandler);
})();
