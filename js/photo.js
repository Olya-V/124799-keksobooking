'use strict';

(function () {
  var TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var chooserContainter = document.querySelector('.form__photo-container .upload');
  var chooser = document.querySelector('#images');
  var container = document.querySelector('.form__photo-container');

  chooserContainter.style.width = '140px';
  container.style.width = '480px';
  container.style.display = 'flex';
  container.style.flexWrap = 'wrap';

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
        preview.style.width = '80px';
        preview.style.height = '70px';
        preview.style.marginRight = '5px';
        preview.style.marginLeft = '5px';
        preview.style.padding = '10px';
      });

      reader.readAsDataURL(file);
    }
  });
})();
