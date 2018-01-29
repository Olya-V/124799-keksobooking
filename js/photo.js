'use strict';

(function () {
  // О Т Р И С О В К А    Ф О Т О    Я Ч Е Е К
  var photoContainer = document.querySelector('.form__photo-container');
  var dropZone = photoContainer.querySelector('.drop-zone');
  var cellsAmount = 8;

  var stylePhotoContainer = function () {
    photoContainer.style.width = '100%';
    photoContainer.style.display = 'flex';
    photoContainer.style.flexWrap = 'wrap';
    photoContainer.style.justifyContent = 'space-between';
    dropZone.style.width = '140px';
    dropZone.style.marginBottom = '5px';
  };

  var createPhotoCells = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < cellsAmount; i++) {
      var cell = document.createElement('div');
      cell.style.width = '140px';
      cell.style.minHeight = '70px';
      cell.style.marginBottom = '5px';
      cell.style.backgroundColor = '#c7c7c7';
      cell.classList.add('form__photo-cell');
      cell.setAttribute('dropzone', 'move');

      var photo = document.createElement('img');
      photo.style.width = '140px';
      photo.style.height = '68px';
      cell.appendChild(photo);
      fragment.appendChild(cell);
    }
    photoContainer.appendChild(fragment);
  };

  var renderPhotoCells = function () {
    stylePhotoContainer();
    createPhotoCells();
  };

  renderPhotoCells();

  // З А Г Р У З К А    Ф А Й Л О В   R E A D E R

  var findEmptyCell = function () {
    var cells = Array.from(document.querySelectorAll('.form__photo-cell img'));

    var emptyCell = cells.find(function (element) {
      return element.src === '';
    });

    return emptyCell;
  };

  var input = document.querySelector('#images');
  window.utils.setMultipleLoad(input);

  var readerLoadHandler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    var emptyCell = findEmptyCell();

    if (!emptyCell) {
      return;
    }

    emptyCell.src = evt.target.result;
  };

  var inputChangeHandler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();

    console.log('change');

    var files = evt.target.files;

    for (var i = 0; i < files.length && i < cellsAmount; i++) {

      var isFormatMatched = window.utils.checkFileFormat(files[i], window.data.fileType);

      if (isFormatMatched) {
        var reader = new FileReader();
        reader.addEventListener('load', readerLoadHandler);
      }
      reader.readAsDataURL(files[i]);
    }

  };

  input.addEventListener('change', inputChangeHandler);


  // З А Г Р У З К А    Ф А Й Л О В   D R A G   A N D  D R O P

  var fileDropHandler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    var files = evt.dataTransfer.files;

    for (var i = 0; i < files.length; i++) {
      var isFormatMatched = window.utils.checkFileFormat(files[i], window.data.fileType);

      if (isFormatMatched) {

        var reader = new FileReader();
        reader.readAsDataURL(files[i]);


        reader.addEventListener('load', readerLoadHandler);
      }
    }
    dropZone.style.backgroundColor = '#f0f0ea';
  };

  var fileDraoverHandler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    dropZone.style.backgroundColor = 'lightblue';
  };

  var fileDropDocumentHandler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    dropZone.style.backgroundColor = '#f0f0ea';
  };

  var fileDragleavehanler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    dropZone.style.backgroundColor = '#ff8972';

    document.addEventListener('drop', fileDropDocumentHandler);

  };

  dropZone.addEventListener('dragover', fileDraoverHandler);
  dropZone.addEventListener('drop', fileDropHandler);
  dropZone.addEventListener('dragleave', fileDragleavehanler);
})();
