'use strict';

(function () {
  var PIN_MAIN = {
    HEIGHT: 87,
    WIDTH: 65
  };
  var PIN_LIMITS = {
    Y_MIN: 100 - PIN_MAIN.HEIGHT,
    Y_MAX: 500 - PIN_MAIN.HEIGHT
  };
  var PIN_TO_RENDER = 5;
  var pinsBlock = document.querySelector('div.map__pins');
  var pinMain = document.querySelector('.map__pin--main');

  /**
   * @description создает DOM-элемен - пин
   * @param {object} offer одно обявление
   * @return {Node} новую DOM-ноду - пин
   */
  var create = function (offer) {
    var templatePin = document.querySelector('template').content.querySelector('button.map__pin');
    var elementPin = templatePin.cloneNode(true);

    elementPin.style.left = offer.location.x + 'px';
    elementPin.style.top = offer.location.y + 'px';
    elementPin.querySelector('img').src = offer.author.avatar;

    return elementPin;
  };

  /**
   * @description активирует пин при нажатии (пин подсвечивается)
   * @param {object} evt
   * @return {object} id активного пина (button), по которому кликнули/нажали
   */
  var activate = function (evt) {
    var activePin = evt.currentTarget;
    activePin.classList.add('map__pin--active');
    return activePin.dataset.id;
  };

  /**
   * @description отрисовывает пины с обработчиком клика на основе загруженных объявлений
   * @param {*} offersElements
   */
  var render = function (offersElements) {
    /**
     * @description обработчик клика по пину.
     * @param {object} evt
     */
    var pinClickHandler = function (evt) {
      disable();
      window.card.remove();
      window.show.card(offersElements[activate(evt)]);
    };
    var fragmentPins = document.createDocumentFragment();
    for (var k = 0; k < offersElements.length && k < PIN_TO_RENDER; k++) {
      var newPin = create(offersElements[k]);
      newPin.setAttribute('data-id', k);
      newPin.addEventListener('click', pinClickHandler);
      fragmentPins.appendChild(newPin);
    }
    pinsBlock.appendChild(fragmentPins);
  };

  /**
   * @description удлаяет отрисованные пины
   */
  var remove = function () {
    var pins = document.querySelectorAll('.map__pin[data-id]');
    Array.from(pins).forEach(function (value) {
      value.remove();
    });
  };

  /**
   * @description деактивирует пины, которые были активны (убирает подсветку)
   */
  var disable = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  /**
   * @description обработчик события клик по главному пину
   * @constructor
   */
  var MainPinClickHandler = function () {
    window.map.show();
    window.form.activate();
    render(window.data.offers);
    window.form.assignAddress(pinMain.offsetLeft, pinMain.offsetTop);
    pinMain.removeEventListener('mouseup', MainPinClickHandler);
  };
  window.backend.download(window.utils.successHandler, window.utils.errorHandler);
  pinMain.addEventListener('mouseup', MainPinClickHandler);
  window.pin = {
    amount: PIN_TO_RENDER,
    main: pinMain,
    parameters: PIN_MAIN,
    limits: PIN_LIMITS,
    disable: disable,
    remove: remove,
    render: render
  };
})();
