'use strict';

(function () {
  var TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var chooserContainter = document.querySelector('.form__photo-container .upload');
  var chooser = document.querySelector('#images');
  var photoContainer = document.querySelector('.form__photo-container');

  chooser.setAttribute('multiple', 'true');
  chooserContainter.style.width = '140px';
  chooserContainter.style.marginBottom = '3px';
  photoContainer.style.width = '460px';
  photoContainer.style.display = 'flex';
  photoContainer.style.flexWrap = 'wrap';
  photoContainer.style.listStyle = 'none';

  /**
   * @description отображает загруженное фото
   * @param {Object} uploadEvt
   */
  var setPhoto = function (uploadEvt) {
    var preview = photoContainer.insertAdjacentElement('beforeend', document.createElement('IMG'));
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

      var check = TYPES.some(function (format) {
        return name.endsWith(format);
      });

      if (check) {
        var reader = new FileReader();
        reader.readAsDataURL(files[j]);
        reader.addEventListener('load', setPhoto);
      }
    }
  };

  chooser.addEventListener('change', photoSelectHandler);
})();
