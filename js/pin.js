'use strict';
(function () {
  var pinsBlock = document.querySelector('div.map__pins');

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
    deleteOpenedPopup();
    createPopup(offers[activatePin(evt)]);
    setFocus();
  };

  /**
   * создает пины на основе объекта объявление - элемент массива @see offers во fragment,
   * пины отрисовываются в блоке .map__pins
   */
  var fragmentPins = document.createDocumentFragment();
  for (var k = 0; k < offers.length; k++) {
    var newPin = createPin(offers[k]);
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
   * @description деактивирует пины, которые были активны (убирает подсветку)
   */
  var disablePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
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

})();
