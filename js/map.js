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
var ENTER_KEYCODE = 13;
/**
 * @description возвращает случайное число от переданных min до max, всключая max
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
 * @description возвращает случайный элемент массива по рандомному индексу, при этом элементы не повторяются,
 * что обеспечивается удалением возвращенных элементов из массива
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
 * @description возвращает ссылку на аватарку автора объявления,
 * используется при создании объекта объявление @see createOneOffer
 * @param {number} i индекс объекта объявления, max индекс задается числом создаваемых объектов
 * @return {string} строку с адресом картинки аватарки
 */
var createAvatarUrl = function (i) {
  return 'img/avatars/user0' + [i + 1] + '.png';
};

/**
 * @description создает и возвращет объект объявление
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

/* Используем функцию создания одного объявления createOneOffer
 * OBJECT_COUNT {number} исходя из необходимого количества объявлений, генерируем объеты объявление в цикле
 * offers {array} сохраняем в переменную offers массив объектов объявления
 */
var offers = [];
for (var j = 0; j < OBJECT_COUNT; j++) {
  offers.push(createOffer(j));
}

/**
 * @description на основании шаблона button.map__pin создает новый DOM-элемен - пин с уникальными координатами
 * и ссылкой на картинку аватарки автора объявления
 * @param {object} offer принимает как параметр один объект обявление из массива объявлений @see offers
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

/* используем функцию создания одного пина createPin
 * offers {array} исходя из количества объявлений в массиве объектов объявления,
 * генерируем нужно количество пинов,
  * прячем с помощью класса .hidden,
  * вставляем в новый fragment
 * отрисовываем все созданные пины в блоке .map__pins
 */

var fragmentPins = document.createDocumentFragment();
for (var k = 0; k < offers.length; k++) {
  var newPin = createPin(offers[k]);
  newPin.classList.add('hidden');
  fragmentPins.appendChild(newPin);
}
pinsBlock.appendChild(fragmentPins);

/**
 * @description убирает класс .hidden у пинов,
 * вызывается в момент события mouseup на метке-кексе в обработчике @see KeksPinClickHandler
 */
var showPins = function () {
  var hidenPins = document.querySelectorAll('button.map__pin.hidden');

  for (var g = 0; g < hidenPins.length; g++) {
    hidenPins[g].classList.remove('hidden');
  }
};

/**
 * @description принимает в качестве параметров:
 * objectFeatures - массив фич объекта объявление (offerObject.offer.features), выглядит как ['wifi', 'elevator']
 *
 * templateFeatures - коллекция DOM-узлов - элементы <li> из списка <ul class="popup__features">,
 * выглядит как [li.feature.feature--wifi, li.feature.feature--dishwasher]
 *
 * В первом цикле преобразуем элементы массива фич объекта к виду 'feature--(название фичи)', например ['feature--wifi', 'feature--elevator']
 *
 * Во втором цикле:
 * метод classList для одного DOM-узла <li> возвращает массив ["feature", "feature--wifi", value: "feature feature--wifi"]
 * Сравниваем наличие первого элемента "feature--wifi" этого DOM-узла в списке фич объекта,
 * если такая фича есть в объекте, оставляем DOM-узел списка фич,
 * если нет - удаляем.
 * @param {array} objectFeatures массив фич объекта объявление
 * @param {*} templateFeatures элементы <li> из списка <ul class="popup__features">
 * возвращает отредактированное количетсво DOM-нод <li> - список фич
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
 * @description на основании шаблона article.map__card отрисовывает popup с объявлением
 * @param {object} offerObject один объект обявление из массива объявлений @see offers
 * @return {object}
 */
var createPopup = function (offerObject) {
  var templateAd = document.querySelector('template').content.querySelector('article.map__card');
  var elementAd = templateAd.cloneNode(true);

  elementAd.querySelector('img').src = offerObject.author.avatar;
  elementAd.querySelector('h3').innerHTML = offerObject.offer.title;
  elementAd.querySelector('small').innerHTML = offerObject.offer.address;
  elementAd.querySelector('.popup__price').innerHTML = offerObject.offer.price + ' &#x20bd;/ночь';
  elementAd.querySelector('h4').innerHTML = type[offerObject.offer.type];
  elementAd.querySelector('p:nth-of-type(3)').innerHTML = offerObject.offer.rooms + ' комнат для ' + offerObject.offer.guests + ' гостей';
  elementAd.querySelector('p:nth-of-type(4)').innerHTML = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;
  elementAd.querySelector('p:nth-of-type(5)').innerHTML = offerObject.offer.description;
  elementAd.classList.add('hidden');

  var templateFeaturesList = elementAd.querySelectorAll('.feature');
  var featuresList = offerObject.offer.features;
  changeFeatures(featuresList, templateFeaturesList);
  return elementAd;
};

/* исходя из количества объектов объявлений в массиве offers
 * генирируем нужно количество объектов popup с помощью функции createPopup,
 * скрываем popup с помощью класса hidden,
 * добавляем в массив popups
 * и отрисовываем все popup в блок .map
 */
var popups = [];
var fragmentAd = document.createDocumentFragment();
var mapFilters = document.querySelector('.map__filters-container');

for (var n = 0; n < offers.length; n++) {
  var newPopup = createPopup(offers[n]);
  newPopup.classList.add('hidden');
  popups.push(newPopup);
  fragmentAd.appendChild(newPopup);
}

map.insertBefore(fragmentAd, mapFilters);

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
 * @description обработчик события клик по метке с кексом:
 * Показывает карту (до нажатия карта затемнена),
 * Атиквирует форму c классом notice__form и поля формы (до нажатия форма неактивна),
 * Показывает пины других схожих объявлений (до нажатия пины скрыты)
 * @constructor
 */
var KeksPinClickHandler = function () {
  showMap();
  activateForm();
  showPins();
};

/**
 * @description деактивирует пины, которые были активны
 * Используется в момент клика/нажатия Enter по другому пину
 */
var disablePin = function () {
  var activePin = document.querySelector('.map__pin--active');
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
};

/**
 * @description активирует пин при нажатии (пин подсвечивается)
 * Если клик произошел по картинке аватарки, тогда родителю - пину (button) присваивается класс map__pin--active.
 * Если клик произошел по "ножке пина - псевдоэлементу", тогда evt.target = button присваивается класс map__pin--active,
 * Аналогично второму варианту активируется пин при нажати Enter, тк evt.target в этом случае тоже button.
 * @param {object} evt
 * @return {object} активный пин (button), по которому кликнули/нажали
 */
var activatePin = function (evt) {
  var activePin = null;
  if (evt.target.tagName === 'IMG') {
    activePin = evt.target.parentNode;
    activePin.classList.add('map__pin--active');
    return activePin;
  } else {
    activePin = evt.target;
    activePin.classList.add('map__pin--active');
    return activePin;
  }
};

/**
 * @description создает массив с адресом аватарок объектов объявления.
 * Используется как связь между активным объектом пин и объектом popup,
 * который надо показать при нажатии на пин в функции findPopupIndex
 * @return {Array} массив url аватарок
 */
var createArrayOfAvatarsUrl = function () {
  var urls = [];
  for (var c = 0; c < offers.length; c++) {
    urls.push(offers[c].author.avatar);
  }
  return urls;
}

/**
 * @description после активации пина, находит индекс popup, который надо показать.
 * Для этого из активного пина вычленяет адрес аватарки,
 * находит индекс этой аватарки в массиве аватарок.
 * Испольуется в функции openPopup,
 * что бы показать нужный popup с таким же индексом как и у активного пина
 * @param {object} evt
 * @return {number} возвращает число - индекс url аватарки = индексу popup, который нужно показать
 */
var findPopupIndex = function (evt) {
  var activePin = activatePin(evt);
  var activePinAvatarURL = activePin.innerHTML.slice(10, 32);
  var urlsArray = createArrayOfAvatarsUrl();
  return urlsArray.indexOf(activePinAvatarURL);
};

/**
 * @description показывает popup
 * @param {object} evt
 */
var openPopup = function (evt) {
  popups[findPopupIndex(evt)].classList.remove('hidden');
};

/**
 * @description после отображения popup устанавливает фокус на кнопке закрытия popup
 */
var setFocus = function () {
  var popup = document.querySelector('.popup:not(.hidden)');
  var closeButton = popup.children[1];
  closeButton.focus();
};

/**
 * @description обработчик клика по пину.
 * Вызывается на блоке родителе div.map__pin -  контейнере пинов, тк внутри этого блока несколько пинов.
 * Если клик произошел по картинке аватарки (img) или по ее "ножке" (button)
 * и при этом класс button это map__pin, но НЕ  map__pin--main (основная метка)
 * тогда:
 * - деактивируем пины, которые нажали ранее
 * - показываем popup (активируем пин, нажатый сейчас, находим индекс автивного пина и по нему нужный popup и показываем popup)
 * - ставим фокус на кнопке закрытия popup
 * @param {object} evt
 */
var pinClickHandler = function (evt) {
  var pressedImg = evt.target.tagName === 'IMG' && evt.path[1].classList[0] === 'map__pin' && evt.path[1].classList[1] !== 'map__pin--main';
  var pressedButton = evt.target.tagName === 'BUTTON' && evt.target.classList[0] === 'map__pin' && evt.target.classList[1] !== 'map__pin--main';

  if (pressedImg || pressedButton) {
    disablePin();
    openPopup(evt);
    setFocus();
    console.log('открыли: клик, стадия: ' + evt.eventPhase);
  }
};

/**
 * @description обработчик нажатия кнопки Enter по пину.
 * Вызывается на блоке родителе div.map__pin -  контейнере пинов, тк внутри этого блока несколько пинов.
 * Если нажатая кнопка это Enter и она нажата на пине (button) с классом map__pin, но НЕ классом map__pin--main (основная метка),
 * тогда:
 * - деактивируем пины, которые нажали ранее
 * - показываем popup (активируем пин, нажатый сейчас, находим индекс автивного пина и по нему нужный popup и показываем popup)
 * - ставим фокус на кнопке закрытия popup
 * @param {object} evt
 */
var pinEnterKeydownHandler = function (evt) {
  var pressedPin = evt.keyCode === ENTER_KEYCODE && evt.target.tagName === 'BUTTON' && evt.target.classList[0] === 'map__pin' && evt.target.classList[1] !== 'map__pin--main';

  if (pressedPin) {
    disablePin();
    console.log(1);
    openPopup(evt);
    console.log(2);
    setFocus();
    console.log('открыли: Enter, стадия:' + evt.eventPhase);
  }
};

/**
 * @description обработчик события клик по кнопке закрытия открытого popup с обяъвлением.
 * Вызывается на
 * @param {object} evt
 */
var closeButtonClickHandler = function (evt) {
  if (evt.target.classList[0] === 'popup__close') {
    evt.target.parentNode.classList.add('hidden');
    disablePin();
    console.log('закрыли: клик, стадия:' + evt.eventPhase);
  }
};

/**
 *
 * @param {object} evt
 */
var closeButtonKeydownHandler = function (evt) {
  if (evt.target.classList[0] === 'popup__close' && evt.keyCode === ENTER_KEYCODE) {
    evt.target.parentNode.classList.add('hidden');
    disablePin();
    console.log('закрыли: Enter, стадия: ' + evt.eventPhase);
  }
  if (evt.keyCode === ESC_KEYCODE) {
    var popup = document.querySelector('.popup:not(.hidden)');
    popup.classList.add('hidden');
    disablePin();
    console.log('закрыли: Esc, стадия: ' + evt.eventPhase);
  }
};


mapPinMainKeks.addEventListener('mouseup', KeksPinClickHandler);

pinsBlock.addEventListener('click', pinClickHandler);

pinsBlock.addEventListener('keydown', pinEnterKeydownHandler);

document.addEventListener('click', closeButtonClickHandler);

document.addEventListener('keydown', closeButtonKeydownHandler);

fadeMap();
disableForm();
