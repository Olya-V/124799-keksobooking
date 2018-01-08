'use strict';

(function () {
  var TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var chooser = document.querySelector('#images');
  var container = document.querySelector('.form__photo-container');

  chooser.addEventListener('change', function () {
    var file = chooser.files[chooser.files.length - 1];
    var fileName = file.name.toLowerCase();

    var matches = TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var preview = container.insertAdjacentElement('beforeend', document.createElement('IMG'));
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
