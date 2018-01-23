'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var RUBLE = '\u20bd';

  /**
   * @description формирует список фич для карточки c объявлением
   * @param {array} objectFeatures массив фич объекта объявление
   * @param {*} templateFeatures коллекция DOM-узлов - элементы <li> из списка <ul class="popup__features">
   */
  var getFeatures = function (objectFeatures, templateFeatures) {
    var objectFeatesNames = objectFeatures.map(function (value) {
      return 'feature--' + value;
    });
    for (var t = 0; t < templateFeatures.length; t++) {
      if (objectFeatesNames.indexOf(templateFeatures[t].classList[1]) === -1) {
        templateFeatures[t].remove();
      }
    }
  };

  /**
   * @description определяет тип жилья для карточки объявления
   * @param {String} type тип жилья из данных с сервера
   * @return {String} тип жилья для краточки
   */
  var getType = function (type) {
    var housingType = {
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    };
    return housingType[type];
  };

  /**
   * @description отрисовывает новый DOM-элемен popup перед .map__filters-container
   * @param {object} offerObject объект обявление -  один элемент из массива объявлений @see offers
   * @return {*} fragment с карточкой объявления
   */
  var create = function (offerObject) {
    var fragmentAd = document.createDocumentFragment();
    var templateAd = document.querySelector('template').content.querySelector('article.map__card');
    var elementAd = templateAd.cloneNode(true);
    var photos = Array.from(offerObject.offer.photos);
    var photoContainer = elementAd.querySelector('.popup__pictures');

    elementAd.querySelector('img').src = offerObject.author.avatar;
    elementAd.querySelector('h3').textContent = offerObject.offer.title;
    elementAd.querySelector('small').textContent = offerObject.offer.address;
    elementAd.querySelector('.popup__price').textContent = offerObject.offer.price + ' ' + RUBLE + '/ночь';
    elementAd.querySelector('h4').textContent = getType(offerObject.offer.type);
    elementAd.querySelector('p:nth-of-type(3)').textContent = offerObject.offer.rooms + ' комнат для ' + offerObject.offer.guests + ' гостей';
    elementAd.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;
    elementAd.querySelector('p:nth-of-type(5)').textContent = offerObject.offer.description;

    var firstPhoto = photoContainer.querySelector('li img');
    firstPhoto.src = photos[0] ? photos[0] : 'img/muffin.png';
    firstPhoto.style.width = '30px';
    firstPhoto.style.height = '28px';
    firstPhoto.style.marginRight = '10px';
    for (var p = 1; p < photos.length; p++) {
      var listItem = photoContainer.insertAdjacentElement('beforeend', document.createElement('LI'));
      var photoItem = listItem.insertAdjacentElement('beforeend', document.createElement('IMG'));
      photoItem.src = photos[p];
      photoItem.style.width = '30px';
      photoItem.style.height = '28px';
      photoItem.style.marginRight = '10px';
    }
    var templateFeaturesList = elementAd.querySelectorAll('.feature');
    var featuresList = offerObject.offer.features;
    getFeatures(featuresList, templateFeaturesList);
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
  var remove = function () {
    var openedPopup = document.querySelector('.popup');

    if (openedPopup) {
      window.data.map.removeChild(openedPopup);
      document.removeEventListener('keydown', closeButtonClickHandler);
    }
  };

  /**
   * @description обработчик события клик по кнопке закрытия открытого popup с обяъвлением.
   * @param {object} evt
   */
  var closeButtonClickHandler = function (evt) {
    if (evt.target.classList[0] === 'popup__close') {
      evt.target.parentNode.classList.add('hidden');
      window.pin.disable();
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
      window.pin.disable();
    }
  };

  window.card = {
    create: create,
    setFocus: setFocus,
    remove: remove,
    popupEscKeydownHandler: popupEscKeydownHandler,
    closeButtonClickHandler: closeButtonClickHandler
  };
})();
