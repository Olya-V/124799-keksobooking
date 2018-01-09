'use strict';

(function () {
  var TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var chooser = document.querySelector('#avatar');
  var preview = document.querySelector('.notice__preview img');

  /**
   * @description обработчик загрузки фоторграфий в форме подачи объявления
   * @param {Object} evt
   */
  var avatarSelectHadler = function (evt) {
    var file = evt.target.files[0];
    var name = file.name.toLowerCase();

    if (window.utils.checkFileFormat(name, TYPES)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
    }
    reader.readAsDataURL(file);
  };
  chooser.addEventListener('change', avatarSelectHadler);
})();
