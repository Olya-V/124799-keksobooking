'use strict';

(function () {
  var PIN_MAIN = {
    HEIGHT: 87,
    WIDTH: 65
  };
  var PIN_LIMITS = {
    Y_MIN: 100,
    Y_MAX: 500
  };
  var pinsBlock = document.querySelector('div.map__pins');
  var pinMain = document.querySelector('.map__pin--main');
  /**
   * @description создает DOM-элемен - пин
   * @param {object} offer объект обявление - элемент из массива объявлений @see offers
   * @return {Node} новую DOM-ноду - пин
   */
  var createPin = function (offer) {
    var templatePin = document.querySelector('template').content.querySelector('button.map__pin');
    var elementPin = templatePin.cloneNode(true);

    elementPin.style.left = offer.location.x + 'px';
    elementPin.style.top = offer.location.y + 'px';
    elementPin.querySelector('img').src = offer.author.avatar;

    return elementPin;
  };

  /**
   * @description обработчик клика по пину.
   * @param {object} evt
   */
  var pinClickHandler = function (evt) {
    disablePin();
    window.card.deleteOpenedPopup();
    window.card.popup(window.data.getOffers[activatePin(evt)]);
    window.card.setFocus();
  };

  /**
   * создает пины на основе объекта объявление - элемент массива @see offers во fragment,
   * пины отрисовываются в блоке .map__pins
   */
  var fragmentPins = document.createDocumentFragment();
  for (var k = 0; k < window.data.getOffers.length; k++) {
    var newPin = createPin(window.data.getOffers[k]);
    newPin.classList.add('hidden');
    newPin.setAttribute('data-id', k);
    newPin.addEventListener('click', pinClickHandler);
    fragmentPins.appendChild(newPin);
  }
  pinsBlock.appendChild(fragmentPins);

  /**
   * @description убирает класс .hidden у пинов,
   */
  var showPins = function () {
    var hidenPins = document.querySelectorAll('button.map__pin.hidden');

    for (var g = 0; g < hidenPins.length; g++) {
      hidenPins[g].classList.remove('hidden');
    }
  };

  /**
   * @description активирует пин при нажатии (пин подсвечивается)
   * @param {object} evt
   * @return {object} активный пин (button), по которому кликнули/нажали
   */
  var activatePin = function (evt) {
    var activePin = evt.currentTarget;
    activePin.classList.add('map__pin--active');
    return activePin.dataset.id;
  };

  /**
   * @description деактивирует пины, которые были активны (убирает подсветку)
   */
  var disablePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  /**
   * @description обработчик события клик по Кекс-пину
   * @constructor
   */
  var keksPinClickHandler = function () {
    window.map.showMap();
    window.form.activateForm();
    showPins();
    pinMain.removeEventListener('mouseup', keksPinClickHandler);
  };

  pinMain.addEventListener('mouseup', keksPinClickHandler);
  window.pin = {
    pinMain: pinMain,
    pinMainParams: PIN_MAIN,
    pinLimits: PIN_LIMITS,
    showPins: showPins,
    disablePin: disablePin
  };
})();
