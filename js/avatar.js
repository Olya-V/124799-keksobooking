'use strict';

(function () {
  var TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var chooser = document.querySelector('#avatar');

  var dropzoneLabel = document.querySelector('.notice__photo .drop-zone');
  /**
   * @description обработчик загрузки аватарки
   * @param {Object} evt
   */
  var avatarUpload = function (evt) {
    var file;

    if (evt.dataTransfer) {
      console.log('dataTransfer ' + evt);
      file = evt.dataTransfer.files[0];
    } else {
      console.log(evt);
      file = evt.target.files[0];
    }
    var name = file.name.toLowerCase();

    if (window.utils.checkFileFormat(name, TYPES)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.data.avatar.src = reader.result;
      });
    }
    reader.readAsDataURL(file);
  };

  var avatarSelectHandler = function (evt) {
    console.log('change');
    avatarUpload(evt);
  };

  var avatarDragoverHandler = function (evt) {
    console.log('gradover ' + evt);
    evt.preventDefault();
    evt.stopPropagation(); // prevent bubbling up to the DOM tree - dragover evt will not be triggred on the parents
    dropzoneLabel.style.backgroundColor = 'lightblue';
  };

  var avatarDragleaveHandler = function (evt) {
    console.log('drag leave ' + evt);
    evt.preventDefault();
    evt.stopPropagation();
    dropzoneLabel.style.backgroundColor = '#f0f0ea';
  };

  var avatarDropHandler = function (evt) {
    console.log('drop');
    evt.preventDefault();
    evt.stopPropagation();
    dropzoneLabel.style.backgroundColor = '#f0f0ea';
    avatarUpload(evt);
  };

  chooser.addEventListener('change', avatarSelectHandler);
  dropzoneLabel.addEventListener('dragover', avatarDragoverHandler);
  dropzoneLabel.addEventListener('dragleave', avatarDragleaveHandler);
  dropzoneLabel.addEventListener('drop', avatarDropHandler);
})();
