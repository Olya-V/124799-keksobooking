'use strict';
(function () {
  var ESC_KEYCODE = 27;

  var map = document.querySelector('section.map');
  var form = document.querySelector('form.notice__form');
  var fields = document.querySelectorAll('form.notice__form fieldset');
  var mapPinMainKeks = document.querySelector('.map__pin--main');

  /**
   * @description затемняет блок .map
   */
  var fadeMap = function () {
    map.classList.add('map--faded');
  };

  /**  @description показывает блок .map--faded
   */
  var showMap = function () {
    map.classList.remove('map--faded');
  };

  /**
   * @description делает поля формы c классом notice__form объединенные в fieldset недоступными
   */
  var disableFields = function () {
    for (var i = 0; i < fields.length; i++) {
      fields[i].setAttribute('disabled', 'disabled');
    }
  };

  /**
   * @description делает форму c классом notice__form неактивной
   */
  var disableForm = function () {
    form.classList.add('notice__form--disabled');
    disableFields();
  };

  /**
   * @description делает поля формы c классом notice__form объединенные в fieldset доступными
   */
  var activateFields = function () {
    for (var i = 0; i < fields.length; i++) {
      fields[i].removeAttribute('disabled');
    }
  };

  /**
   * @description делает форму c классом notice__form активной
   */
  var activateForm = function () {
    form.classList.remove('notice__form--disabled');
    activateFields();
  };

  /**
   * @description обработчик события клик по метке с кексом
   * @constructor
   */
  var KeksPinClickHandler = function () {
    showMap();
    activateForm();
    showPins();
  };

  /**
   * @description устанавливает фокус на кнопке закрытия popup
   */
  var setFocus = function () {
    var popup = document.querySelector('.popup');
    var closeButton = popup.children[1];
    closeButton.focus();
  };

  /**
   * @description удаляет открые ранее popup
   */
  var deleteOpenedPopup = function () {
    var openedPopup = document.querySelector('.popup');

    if (openedPopup) {
      map.removeChild(openedPopup);
    }
  };


  /**
   * @description обработчик события клик по кнопке закрытия открытого popup с обяъвлением.
   * @param {object} evt
   */
  var closeButtonClickHandler = function (evt) {
    if (evt.target.classList[0] === 'popup__close') {
      evt.target.parentNode.classList.add('hidden');
      disablePin();
    }
  };

  /**
   * @description обработчик события нажатия кнопки Esc, когда есть открытый popup с обяъвлением.
   * @param {object} evt
   */
  var popupEscKeydownHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      var popup = document.querySelector('.popup:not(.hidden)');
      popup.classList.add('hidden');
      disablePin();
    }
  };

  mapPinMainKeks.addEventListener('mouseup', KeksPinClickHandler);

  document.addEventListener('click', closeButtonClickHandler);

  document.addEventListener('keydown', popupEscKeydownHandler);

  fadeMap();
  disableForm();

})();
