'use strict';

(function () {
  var TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AMOUNT = 10;
  var COLOR_GREY = '#ada8a8';

  var chooserContainter = document.querySelector('.form__photo-container .upload');
  var chooser = document.querySelector('#images');
  var photoContainer = document.querySelector('.form__photo-container');
  var photoList = photoContainer.insertAdjacentElement('beforeend', document.createElement('UL'));

  var createPhotoSpaces = function () {
    for (var l = 0; l < AMOUNT; l++) {
      var item = photoList.insertAdjacentElement('beforeend', document.createElement('LI'));
      item.style.backgroundColor = COLOR_GREY;
      item.style.width = '80px';
      item.style.height = '70px';
      item.style.margin = '5px';
      item.style.borderRadius = '3px';
    }
    chooserContainter.style.width = '140px';
    chooserContainter.style.marginBottom = '3px';
    photoContainer.style.width = '480px';
    photoList.style.display = 'flex';
    photoList.style.flexWrap = 'wrap';
    photoList.style.listStyle = 'none';
    photoList.style.margin = '0px';
    photoList.style.padding = '0px';
    photoList.setAttribute('dropzone', 'move');
  };

  createPhotoSpaces();

  var findEmptySpace = function (items) {
    for (var u = 0; u < items.length; u++) {
      if (items[u].hasChildNodes() === false) {
        var photoSpace = items[u];
        break;
      }
    }
    return photoSpace;
  };

  chooser.addEventListener('change', function () {
    var photoItems = photoContainer.querySelector('ul').querySelectorAll('li');
    var file = chooser.files[chooser.files.length - 1];
    var fileName = file.name.toLowerCase();

    var matches = TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var photoSpace = findEmptySpace(photoItems);
      var preview = photoSpace.insertAdjacentElement('beforeend', document.createElement('IMG'));
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
        preview.draggable = true;
        preview.style.width = '80px';
        preview.style.height = '70px';
      });
      reader.readAsDataURL(file);
    }
  });
  // П Е Р Е Т А С К И В А Н И Е
  var draggedItem = null;

  photoList.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  photoList.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  photoList.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = COLOR_GREY;
    evt.target.appendChild(draggedItem);
    evt.preventDefault();
  });

  photoList.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
  });

  photoList.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
  });
})();
