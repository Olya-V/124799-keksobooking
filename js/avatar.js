'use strict';

(function () {
  var input = document.querySelector('#avatar');

  var dropzoneLabel = document.querySelector('.notice__photo .drop-zone');

  var uploadSingleFile = function (evt) {
    var file;

    if (evt.dataTransfer) {
      file = evt.dataTransfer.files[0];
    } else {
      file = evt.target.files[0];
    }

    return file;
  };


  var renderSingleFile = function (evt) {
    var file = uploadSingleFile(evt);

    if (!file) {
      return;
    }
    console.log(evt);
    console.log(file);
    if (window.utils.checkFileFormat(file, window.data.fileType)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.data.avatar.src = reader.result;
        window.data.avatar.setAttribute('graggable', true);
      });
    }
    reader.readAsDataURL(file);
  };

  var selectHandler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    console.log('change');
    renderSingleFile(evt);
  };

  var dragoverHandler = function (evt) {
    console.log('drag over');
    evt.preventDefault();
    evt.stopPropagation();
    dropzoneLabel.style.backgroundColor = 'lightblue';
  };

  var dragleaveHandler = function (evt) {
    console.log('drag leave');
    evt.preventDefault();
    evt.stopPropagation();
    dropzoneLabel.style.backgroundColor = '#f0f0ea';
  };

  var dropHandler = function (evt) {
    console.log('drop');
    evt.preventDefault();
    evt.stopPropagation();
    dropzoneLabel.style.backgroundColor = '#f0f0ea';
    renderSingleFile(evt);
  };

  var dragstartHandler = function () {
    console.log('drag start');

    window.data.avatar.addEventListener('dragend', function (evt) {
      console.log('drag end');
      console.log(evt);
      window.data.avatar.src = 'img/muffin.png';

    });
  };

  input.addEventListener('change', selectHandler);
  dropzoneLabel.addEventListener('dragover', dragoverHandler);
  dropzoneLabel.addEventListener('dragleave', dragleaveHandler);
  dropzoneLabel.addEventListener('drop', dropHandler);
  window.data.avatar.addEventListener('dragstart', dragstartHandler);

})();
