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
    photoContainer.style.width = '460px';
    photoList.style.display = 'flex';
    photoList.style.flexWrap = 'wrap';
    photoList.style.listStyle = 'none';
    photoList.style.margin = '0px';
    photoList.style.padding = '0px';
    photoList.setAttribute('dropzone', 'move');
    photoList.style.borderWidth = '5px';
    photoList.style.border = 'dashed';
    photoList.style.borderColor = 'transparent';
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

  var dragstartHandler = function (evt) {
    console.log('dragStart');
    console.log(evt);
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.currentTarget.style.borderColor = 'black';
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      evt.dataTransfer.effectAllowed = 'move';
    }
  };

  var dragoverHandler = function (evt) {
    console.log('dragOver');
    console.log(evt);
    evt.currentTarget.style.background = 'lightblue';
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
    return false;
  };

  var dragenterHandler = function (evt) {
    evt.currentTarget.style.background = 'yellow';
    // evt.preventDefault();
  };

  var dropHandler = function (evt) {
    console.log('Drop');
    console.log(evt);
    evt.target.style.backgroundColor = COLOR_GREY;
    evt.currentTarget.style.background = '';
    evt.currentTarget.style.borderColor = 'trasnparent';
    evt.preventDefault();
    evt.target.appendChild(draggedItem);
  };

  var dragleaveHandler = function (evt) {
    console.log('dragLeave');
    console.log(evt);
    evt.currentTarget.style.background = 'red';
    // evt.preventDefault();
  };

  var dragendHandler = function (evt) {
    console.log('dragEnd');
    console.log(evt);
    evt.target.background = 'pink';
  };

  var dragexitHandler = function (evt) {
    console.log('dragExit');
    console.log(evt);
    evt.currentTarget.style.background = 'green';
  };

  photoList.addEventListener('dragstart', dragstartHandler);
  photoList.addEventListener('dragover', dragoverHandler);
  photoList.addEventListener('dragenter', dragenterHandler);
  photoList.addEventListener('dragleave', dragleaveHandler);
  photoList.addEventListener('drop', dropHandler);
  photoList.addEventListener('dradend', dragendHandler);
  photoList.addEventListener('dradexit', dragexitHandler);
})();
