'use strict';
/*
Создайте модуль synchronize-fields.js, связывающий поля между собой таким образом,
чтобы логика изменения значения зависимого поля находилась в функции обратного вызова

Для этого уберите из функции параметр, принимающий на вход название свойства второго объекта,
и вместо неё добавьте функцию обратного вызова. Пример использования функции после внесения изменений:

// Синхронизация полей времени заезда и выезда
var checkinTime = document.querySelector('#time');
var checkoutTime = document.querySelector('#timeout');

var syncValues = function(element, value) {
  element.value = value;
};

window.synchronizeFields(checkinTime, checkoutTime, ['12', '13', '14'], ['12', '13', '14'], syncValues);
 */

timeInt.addEventListener('change', function () {
  timeOut.options[timeInt.options.selectedIndex].selected = true;
});


element1.addEventListener('change', function () {
  element2.options[this.options.selectedIndex].selected = true;
});



(function () {
  var syncValues = function (element, value) {

    // document.querySelector('#timeout [value="12:00"]')

    for (var i = 0; i < element.options.length; i++) {
      if (element.options[i].value === value)
    }

  };



  window.synchronizeFields = function (element1, element2, arrayOfValue1, arrayOfValue2, callback) {
    element1.addEventListener('change', callback(element2, arrayOfValue2));
    element2.addEventListener('change', callback(element1, arrayOfValue1));
  };
})();

var element = {
  value: []
}
