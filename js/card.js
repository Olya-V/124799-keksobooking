'use strict';

(function () {
  var type = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  /**
   * @description из списка всех возможных фич оставляет только те, которые есть в объекте объявление.
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

  window.card = {
    /**
     * @description перед .map__filters-container отрисовывает новый DOM-элемен popup
     * @param {object} offerObject объект обявление -  один элемент из массива объявлений @see offers
     */
    popup: function (offerObject) {
      var templateAd = document.querySelector('template').content.querySelector('article.map__card');
      var elementAd = templateAd.cloneNode(true);
      var fragmentAd = document.createDocumentFragment();
      var mapFilters = document.querySelector('.map__filters-container');
      elementAd.querySelector('img').src = offerObject.author.avatar;
      elementAd.querySelector('h3').innerHTML = offerObject.offer.title;
      elementAd.querySelector('small').innerHTML = offerObject.offer.address;
      elementAd.querySelector('.popup__price').innerHTML = offerObject.offer.price + ' &#x20bd;/ночь';
      elementAd.querySelector('h4').innerHTML = type[offerObject.offer.type];
      elementAd.querySelector('p:nth-of-type(3)').innerHTML = offerObject.offer.rooms + ' комнат для ' + offerObject.offer.guests + ' гостей';
      elementAd.querySelector('p:nth-of-type(4)').innerHTML = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;
      elementAd.querySelector('p:nth-of-type(5)').innerHTML = offerObject.offer.description;

      var templateFeaturesList = elementAd.querySelectorAll('.feature');
      var featuresList = offerObject.offer.features;
      changeFeatures(featuresList, templateFeaturesList);
      fragmentAd.appendChild(elementAd);
      window.data.map.insertBefore(fragmentAd, mapFilters);
    }
  };
})();
