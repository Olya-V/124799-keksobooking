'use strict';

var title = ['Большая уютная квартира', 'Маленькая неуютная квартира',
  'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var type = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var map = document.querySelector('section.map');
var form = document.querySelector('form.notice__form');
var fields = document.querySelectorAll('form.notice__form fieldset');
var mapPinMainKeks = document.querySelector('.map__pin--main');
var pinsBlock = document.querySelector('div.map__pins');

var OBJECT_COUNT = 8;
var PRICE = {
  MIN: 1000,
  MAX: 1000000
};
var ROOMS = {
  MIN: 1,
  MAX: 5
};
var GUESTS = {
  MIN: 1,
  MAX: 100
};
var LOCATION = {
  X_MIN: 300,
  X_MAX: 900,
  Y_MIN: 164,
  Y_MAX: 500
};
var ESC_KEYCODE = 27;

/**
 * @description возвращает случайное число от min до max, всключая max
 * @param {number} min
 * @param {number} max
 * @return {number} случайное число
 */
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

/**
 * @description возвращает случайный элемент массива по рандомному индексу, элементы могут повторяться
 * @param {array} arrayOfElements
 * @return {*} рандомный элемент массива
 */
var getRandomElement = function (arrayOfElements) {
  var randomIndex = getRandomNumber(0, arrayOfElements.length - 1);
  return arrayOfElements[randomIndex];
};

/**
 * @description возвращает случайный элемент массива по рандомному индексу, элементы не повторяются
 * @param {array} arrayOfElements
 * @return {*} рандомный элемент массива
 */
var getRandomElementNoRepeat = function (arrayOfElements) {
  var randomIndex = getRandomNumber(0, arrayOfElements.length - 1);
  return arrayOfElements.splice(randomIndex, 1);
};

/**
 * @description возвращает массив случайной длинны исходя из переданного массива
 * @param {array} arrayOfElements исходный массив данных
 * @return {array} новый массив
 */
var getRandomArray = function (arrayOfElements) {
  return arrayOfElements.slice(getRandomNumber(1, arrayOfElements.length - 1));
};

/**
 * @description возвращает ссылку на аватарку автора объявления
 * @param {number} i индекс объекта объявления, max индекс задается числом создаваемых объектов
 * @return {string} строку с адресом картинки аватарки
 */
var createAvatarUrl = function (i) {
  return 'img/avatars/user0' + [i + 1] + '.png';
};

/**
 * @description создает объект объявление
 * @param {number} i индекс объекта объявления, max индекс задается числом создаваемых объектов
 * @return {object} объект объявление
 */
var createOffer = function (i) {
  var coordinateX = getRandomNumber(LOCATION.X_MIN, LOCATION.X_MAX);
  var coordinateY = getRandomNumber(LOCATION.Y_MIN, LOCATION.Y_MAX);
  return {
    'author': {
      'avatar': createAvatarUrl(i)
    },
    'offer': {
      'title': getRandomElementNoRepeat(title),
      'address': coordinateX + ', ' + coordinateY,
      'price': getRandomNumber(PRICE.MIN, PRICE.MAX),
      'type': getRandomElement(Object.keys(type)),
      'rooms': getRandomNumber(ROOMS.MIN, ROOMS.MAX),
      'guests': getRandomNumber(GUESTS.MIN, GUESTS.MAX),
      'checkin': getRandomElement(checkin),
      'checkout': getRandomElement(checkout),
      'features': getRandomArray(features),
      'description': '',
      'photos': []
    },
    'location': {
      'x': coordinateX,
      'y': coordinateY
    }
  };
};

/* offers {array} массив с объектами обяъвлений
 * OBJECT_COUNT {number} количество объявлений
 */
var offers = [];
for (var j = 0; j < OBJECT_COUNT; j++) {
  offers.push(createOffer(j));
}

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

/**
 * @description перед .map__filters-container отрисовывает новый DOM-элемен popup
 * @param {object} offerObject объект обявление -  один элемент из массива объявлений @see offers
 */
var createPopup = function (offerObject) {
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
  map.insertBefore(fragmentAd, mapFilters);
};

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


// В А Л И Д А Ц И Я   Ф О Р М Ы

var TITLE_MIN_LENGTH = 30;
var TITLE_MAX_LENGTH = 100;
var SHACK_MIN_PRICE = '0';
var APPARTMENT_MIN_PRICE = '1000';
var HOUSE_MIN_PRICE = '5000';
var PALACE_MIN_PRICE = '10000';

var adForm = document.querySelector('.notice__form');
var adAddress = document.querySelector('#address');
var adTitle = document.querySelector('#title');
var adPrice = document.querySelector('#price');
var adTimeInt = document.querySelector('#timein');
var adTimeOut = document.querySelector('#timeout');
var adType = document.querySelector('#type');
var adRooms = document.querySelector('#room_number');
var adGuests = document.querySelector('#capacity');

adTitle.addEventListener('invalid', function () {
  if (adTitle.validity.valueMissing) {
    adTitle.setCustomValidity('Это обязательное поле. Введите от ' + TITLE_MIN_LENGTH + ' до ' + TITLE_MAX_LENGTH + ' символов.');
  } else if (adTitle.validity.tooShort) {
    adTitle.setCustomValidity('Минимальная длина — ' + TITLE_MIN_LENGTH + ' символов');
  } else {
    adTitle.setCustomValidity('');
  }
});

adPrice.addEventListener('invalid', function () {
  if (adPrice.value === '' || adPrice.validity.valueMissing) {
    adPrice.setCustomValidity('Это обязательное поле. Введите число.');
  } else if (adPrice.validity.rangeUnderflow) {
    adPrice.setCustomValidity('Минимальное значение цены - ' + adPrice.min);
  } else if (adPrice.validity.rangeOverflow) {
    adPrice.setCustomValidity('Максимальное значение цены - ' + adPrice.max);
  } else {
    adPrice.setCustomValidity('');
  }
});

// Поля «время заезда» и «время выезда» синхронизированы

adTimeInt.addEventListener('change', function () {
  if (adTimeInt.options.selectedIndex === 0) {
    adTimeOut.options[0].selected = true;
  } else if (adTimeInt.options.selectedIndex === 1) {
    adTimeOut.options[1].selected = true;
  } else if (adTimeInt.options.selectedIndex === 2) {
    adTimeOut.options[2].selected = true;
  }
});

adTimeOut.addEventListener('change', function () {
  if (adTimeOut.options.selectedIndex === 0) {
    adTimeInt.options[0].selected = true;
  } else if (adTimeOut.options.selectedIndex === 1) {
    adTimeInt.options[1].selected = true;
  } else if (adTimeOut.options.selectedIndex === 2) {
    adTimeInt.options[2].selected = true;
  }
});

// Значение поля «Тип жилья» синхронизировано с минимальной ценой

var setPriceForSelectedType = function () {
  if (adType.options.selectedIndex === 0) {
    adPrice.setAttribute('min', APPARTMENT_MIN_PRICE);
  }
};

setPriceForSelectedType();

adType.addEventListener('change', function () {
  if (adType.options.selectedIndex === 0) {
    adPrice.setAttribute('min', APPARTMENT_MIN_PRICE);
  } else if (adType.options.selectedIndex === 1) {
    adPrice.setAttribute('min', SHACK_MIN_PRICE);
  } else if (adType.options.selectedIndex === 2) {
    adPrice.setAttribute('min', HOUSE_MIN_PRICE);
  } else if (adType.options.selectedIndex === 3) {
    adPrice.setAttribute('min', PALACE_MIN_PRICE);
  }
});

/*
Количество комнат связано с количеством гостей:
1 комната — «для одного гостя»
2 комнаты — «для 2-х или 1-го гостя»
3 комнаты — «для 2-х, 1-го или 3-х гостей»
100 комнат — «не для гостей»
При изменении количества комнат должно автоматически меняться количество гостей,
 которых можно разместить.
 В обратную сторону синхронизацию делать не нужно
 */

adRooms.addEventListener('change', function () {
  if (adRooms.options.selectedIndex === 0) {
    adGuests.options[2].selected = true;
    adGuests.options[0].selected = false;
    adGuests.options[1].selected = false;
    adGuests.options[3].selected = false;
  } else if (adRooms.options.selectedIndex === 1) {
    adGuests.options[1].selected = true;
    adGuests.options[2].selected = true;
    adGuests.options[0].selected = false;
    adGuests.options[3].selected = false;
  } else if (adRooms.options.selectedIndex === 2) {
    adGuests.options[0].selected = true;
    adGuests.options[1].selected = true;
    adGuests.options[2].selected = true;
    adGuests.options[3].selected = false;
  } else if (adRooms.options.selectedIndex === 3) {
    adGuests.options[3].selected = true;
    adGuests.options[0].selected = false;
    adGuests.options[1].selected = false;
    adGuests.options[2].selected = false;
  }
});

adForm.addEventListener('submit', function (evt) {
  var inputs = [adTitle, adPrice, adAddress];

  for (var w = 0; w < inputs.length; w++) {
    if (!inputs[w].validity.valid || inputs[w].value === '') {
      inputs[w].style.borderColor = 'red';
      evt.preventDefault();
    }
  }
}, false);
