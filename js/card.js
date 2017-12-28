'use strict';

(function () {
  var ESC_KEYCODE = 27;

  /**
   * @description формирует список фич для карточки c объявлением
   * @param {array} objectFeatures массив фич объекта объявление
   * @param {*} templateFeatures коллекция DOM-узлов - элементы <li> из списка <ul class="popup__features">
   */
  var changeFeatures = function (objectFeatures, templateFeatures) {
    for (var f = 0; f < objectFeatures.length; f++) {
      objectFeatures[f] = 'feature--' + objectFeatures[f];
    }
    for (var t = 0; t < templateFeatures.length; t++) {
      if (objectFeatures.indexOf(templateFeatures[t].classList[1]) === -1) {
        templateFeatures[t].remove();
      }
    }
  };

  /**
   * @description отрисовывает новый DOM-элемен popup перед .map__filters-container
   * @param {object} offerObject объект обявление -  один элемент из массива объявлений @see offers
   */
  var createPopup = function (offerObject) {
    var fragmentAd = document.createDocumentFragment();
    var templateAd = document.querySelector('template').content.querySelector('article.map__card');
    var elementAd = templateAd.cloneNode(true);
    elementAd.querySelector('img').src = offerObject.author.avatar;
    elementAd.querySelector('h3').innerHTML = offerObject.offer.title;
    elementAd.querySelector('small').innerHTML = offerObject.offer.address;
    elementAd.querySelector('.popup__price').innerHTML = offerObject.offer.price + ' &#x20bd;/ночь';
    elementAd.querySelector('h4').innerHTML = window.data.type[offerObject.offer.type];
    elementAd.querySelector('p:nth-of-type(3)').innerHTML = offerObject.offer.rooms + ' комнат для ' + offerObject.offer.guests + ' гостей';
    elementAd.querySelector('p:nth-of-type(4)').innerHTML = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;
    elementAd.querySelector('p:nth-of-type(5)').innerHTML = offerObject.offer.description;

    var templateFeaturesList = elementAd.querySelectorAll('.feature');
    var featuresList = offerObject.offer.features;
    changeFeatures(featuresList, templateFeaturesList);
    fragmentAd.appendChild(elementAd);
    return fragmentAd;
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
   * @description удаляет открытые ранее popup
   */
  var deleteOpenedPopup = function () {
    var openedPopup = document.querySelector('.popup');

    if (openedPopup) {
      window.data.map.removeChild(openedPopup);
    }
  };

  /**
   * @description обработчик события клик по кнопке закрытия открытого popup с обяъвлением.
   * @param {object} evt
   */
  var closeButtonClickHandler = function (evt) {
    if (evt.target.classList[0] === 'popup__close') {
      evt.target.parentNode.classList.add('hidden');
      window.pin.disablePin();
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
      window.pin.disablePin();
    }
  };

  document.addEventListener('click', closeButtonClickHandler);

  document.addEventListener('keydown', popupEscKeydownHandler);

  window.card = {
    createPopup: createPopup,
    setFocus: setFocus,
    deleteOpenedPopup: deleteOpenedPopup
  };
})();
