'use strict';

(function () {
  var TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var chooser = document.querySelector('#avatar');
  var preview = document.querySelector('.notice__preview img');

  chooser.addEventListener('change', function () {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
