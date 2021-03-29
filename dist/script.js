/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calendar_calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calendar/calendar */ "./src/js/modules/calendar/calendar.js");
/* harmony import */ var _modules_calendar_calendar_mini__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calendar/calendar-mini */ "./src/js/modules/calendar/calendar-mini.js");




window.addEventListener('DOMContentLoaded', () => {
  const date = new Date();
  new _modules_calendar_calendar__WEBPACK_IMPORTED_MODULE_0__["default"]('.diary', date).init();
  new _modules_calendar_calendar_mini__WEBPACK_IMPORTED_MODULE_1__["default"]('.left_side', date).init();
});

/***/ }),

/***/ "./src/js/modules/calendar/calendar-mini.js":
/*!**************************************************!*\
  !*** ./src/js/modules/calendar/calendar-mini.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CalendarMini; });
/* harmony import */ var _calendarDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calendarDOM */ "./src/js/modules/calendar/calendarDOM.js");
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./matrix */ "./src/js/modules/calendar/matrix.js");


class CalendarMini {
  constructor(selector, date) {
    this.aside = document.querySelector(selector);
    this.selector = selector;
    this.date = date;
  }

  createCalendar(date) {
    this.date = date;
    const matrix = new _matrix__WEBPACK_IMPORTED_MODULE_1__["default"](this.date).init();
    new _calendarDOM__WEBPACK_IMPORTED_MODULE_0__["default"](this.selector, matrix, date, 'mini').init();
  }

  createListeners() {
    this.aside.querySelectorAll('.changeMonth').forEach(arrow => {
      arrow.addEventListener('click', () => {
        let date;

        if (arrow.classList.contains('prevMonth')) {
          date = new Date(this.date.getFullYear(), this.date.getMonth() - 1);
        } else {
          date = new Date(this.date.getFullYear(), this.date.getMonth() + 1);
        }

        this.remove();
        this.createCalendar(date);
        this.createListeners();
      });
    });
  }

  remove() {
    this.aside.innerHTML = '';
  }

  init() {
    this.createCalendar(this.date);
    this.createListeners();
  }

}

/***/ }),

/***/ "./src/js/modules/calendar/calendar.js":
/*!*********************************************!*\
  !*** ./src/js/modules/calendar/calendar.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Calendar; });
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matrix */ "./src/js/modules/calendar/matrix.js");
/* harmony import */ var _calendarDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendarDOM */ "./src/js/modules/calendar/calendarDOM.js");
/* harmony import */ var _week__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./week */ "./src/js/modules/calendar/week.js");
/* harmony import */ var _day__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./day */ "./src/js/modules/calendar/day.js");




class Calendar {
  constructor(selector, date) {
    this.diary = document.querySelector(selector);
    this.date = date;
  }

  createCalendar(date) {
    this.date = date;
    const matrix = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](date).init();
    new _calendarDOM__WEBPACK_IMPORTED_MODULE_1__["default"]('.diary', matrix, date).init();
  }

  createListeners() {
    // Реализуем анимацию на ячейках календаря при наведении
    this.diary.querySelectorAll('.calendar .item').forEach(item => {
      item.addEventListener('mouseover', () => {
        item.classList.add('hover');
        this.createPerspectiveAnimation(item);
      });
      item.addEventListener('mouseout', () => {
        item.classList.remove('hover');
      });
    }); // Листаем месяцы в календаре

    document.querySelectorAll('header .changeMonth').forEach(arrow => {
      arrow.addEventListener('click', () => {
        let date;

        if (arrow.classList.contains('prevMonth')) {
          date = new Date(this.date.getFullYear(), this.date.getMonth() - 1);
        } else {
          date = new Date(this.date.getFullYear(), this.date.getMonth() + 1);
        }

        this.clear();
        this.createCalendar(date);
        this.createListeners();
      });
    }); // Показываем выбранную неделю
    // this.diary.querySelectorAll('.weekArrow').forEach((arrow) => {
    // 	arrow.addEventListener('click', () => {
    // 		const id = arrow.id.substr(-1, 1);
    // 		this.diary.querySelectorAll('tr').forEach((tr, i) => {
    // 			if (i == id) {
    // 				const clone = tr.cloneNode(true);
    // 				this.clear();
    // 				new Week(clone).init();
    // 			}
    // 		});
    // 	});
    // });
    // Показываем выбранный день

    this.diary.querySelectorAll('.dateDay').forEach(day => {
      day.addEventListener('click', () => {
        const clone = day.cloneNode(true);
        this.clear();
        new _day__WEBPACK_IMPORTED_MODULE_3__["default"](clone).init();
        document.querySelector('.diary').style.flexGrow = '1';
      });
    });
  } // Анимация каждой ячейки календаря при наведениее мышки


  createPerspectiveAnimation(item) {
    let flag = true;
    let degX = 0;
    let degY = 0;

    function animation() {
      if (flag == true) {
        degX += 0.1;
        degY += 0.1;
      } else {
        // degX -= 0.05;
        degY -= 0.1;
      }

      degX >= 30 ? degX = 30 : null;

      if (degY >= 20) {
        flag = false;
      } else if (degY <= -20) {
        flag = true;
      }

      item.style.transform = `scale(1.5) rotateX(${degX}deg) rotateY(${degY}deg)`;

      if (item.classList.contains('hover')) {
        requestAnimationFrame(animation);
      } else {
        item.style.transform = '';
      }
    }

    requestAnimationFrame(animation);
  } // createWeekArrows() {
  // 	const weekArrows = document.createElement('div');
  // 		  weekArrows.classList.add('weekArrows');
  // 	for (let i = 0; i <= 5; i++) {
  // 		const arrow = document.createElement('div');
  // 			  arrow.classList.add('weekArrow');
  // 			  arrow.id = `week_${i}`;
  // 	    arrow.innerHTML = `<img src="/assets/icons/arrow-right.png">`;
  // 		weekArrows.appendChild(arrow);
  // 	}
  // 	this.diary.querySelector('tbody').appendChild(weekArrows);
  // }


  clear() {
    this.diary.innerHTML = '';
    document.querySelector('header .header').remove();
  }

  init() {
    this.createCalendar(this.date); // this.createWeekArrows();

    this.createListeners();
  }

}

/***/ }),

/***/ "./src/js/modules/calendar/calendarDOM.js":
/*!************************************************!*\
  !*** ./src/js/modules/calendar/calendarDOM.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CalendarDOM; });
class CalendarDOM {
  constructor(selector, matrix, date, size = 'big') {
    this.container = document.querySelector(selector);
    this.matrix = matrix;
    this.date = date;
    this.size = size;
  }

  createDOM() {
    const arrOfMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
          calendar = document.createElement('div'),
          table = document.createElement('table'),
          thead = document.createElement('thead'),
          tbody = document.createElement('tbody'),
          header = document.createElement('div'),
          month = document.createElement('div'),
          prevMonth = document.createElement('div'),
          nextMonth = document.createElement('div');
    let arrOfDays = [];

    if (this.size == 'big') {
      arrOfDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    } else {
      arrOfDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    }

    for (let i = 0; i < arrOfDays.length; i++) {
      const th = document.createElement('th');
      th.innerHTML = arrOfDays[i];
      thead.appendChild(th);
    }

    for (let array of this.matrix) {
      const tr = document.createElement('tr');

      for (let i = 0; i < array.length; i++) {
        const now = new Date();
        const td = document.createElement('td');
        const item = document.createElement('div');
        const dateDay = document.createElement('div');
        item.classList.add('item');
        dateDay.classList.add('dateDay');

        if (array[i] == now.getDate() && this.date.getFullYear() == now.getUTCFullYear() && this.date.getMonth() == now.getMonth()) {
          dateDay.classList.add('today');
        }

        i == array.length - 1 || i == array.length - 2 ? dateDay.classList.add('weekend') : null;
        dateDay.innerHTML = array[i];
        item.appendChild(dateDay);
        td.appendChild(item);
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    }

    calendar.classList.add('calendar');
    header.classList.add('header');
    month.classList.add('month');
    prevMonth.classList.add('prevMonth', 'changeMonth');
    nextMonth.classList.add('nextMonth', 'changeMonth');
    month.innerHTML = `${arrOfMonths[this.date.getMonth()]} ${this.date.getFullYear()}`;
    prevMonth.innerHTML = `<img src="/assets/icons/arrow-left.png">`;
    nextMonth.innerHTML = `<img src="/assets/icons/arrow-right.png">`;
    table.append(thead, tbody);
    calendar.appendChild(table);

    if (this.size == 'big') {
      header.append(month, prevMonth, nextMonth);
      document.querySelector('header').appendChild(header);
    } else {
      header.append(prevMonth, month, nextMonth);
      this.container.appendChild(header);
    }

    this.container.appendChild(calendar);
  }

  init() {
    return this.createDOM();
  }

}

/***/ }),

/***/ "./src/js/modules/calendar/day.js":
/*!****************************************!*\
  !*** ./src/js/modules/calendar/day.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Day; });
class Day {
  constructor(day) {
    this.day = day;
  }

  createDay() {
    const day = document.createElement('div');
    day.classList.add('day');
    day.appendChild(this.day);
    document.querySelector('.diary').appendChild(day);
  }

  centeringNumberOfDay() {
    const top = document.querySelector('.dateDay').getBoundingClientRect();
    console.log(top);
  }

  createGraph() {
    const table = document.createElement('table');

    for (let i = 1; i <= 24; i++) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      const time = document.createElement('div');
      time.classList.add('time');
      time.innerHTML = `${addZero(i)}:00`;
      tr.append(time, td);
      table.appendChild(tr);
    }

    function addZero(num) {
      if (num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }

    document.querySelector('.day').prepend(table);
  }

  createListeners() {
    document.querySelector('.day').addEventListener('scroll', () => {
      const px = document.querySelector('.day').scrollTop;
      document.querySelector('.day .dateDay').style.top = `calc(50% - ${200 - px}px)`;
    });
  }

  init() {
    this.createDay();
    this.centeringNumberOfDay();
    this.createGraph();
    this.createListeners();
  }

}

/***/ }),

/***/ "./src/js/modules/calendar/matrix.js":
/*!*******************************************!*\
  !*** ./src/js/modules/calendar/matrix.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Matrix; });
class Matrix {
  constructor(date) {
    this.date = date;
  }

  createCalendarMatrix() {
    const amountOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    const dayOfWeek = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    const arr = [];
    let count = 1;

    for (let i = 1; i <= 6; i++) {
      const row = [];

      for (let j = 1; j <= 7; j++) {
        if (i == 1 && j < dayOfWeek || count > amountOfDays) {
          row.push('');
        } else {
          row.push(count++);
        }
      }

      arr.push(row);
    }

    return arr;
  }

  init() {
    return this.createCalendarMatrix();
  }

}

/***/ }),

/***/ "./src/js/modules/calendar/week.js":
/*!*****************************************!*\
  !*** ./src/js/modules/calendar/week.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Week; });
class Week {
  constructor(week) {
    this.week = week;
  }

  createWeek() {
    const arrOfDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    const week = document.createElement('div');
    week.classList.add('week');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    for (let elem of arrOfDays) {
      const th = document.createElement('th');
      th.innerHTML = elem;
      thead.appendChild(th);
    }

    tbody.appendChild(this.week);
    table.append(thead, tbody);
    week.appendChild(table);
    document.querySelector('.diary').appendChild(week);
  }

  init() {
    this.createWeek();
  }

}

/***/ })

/******/ });
//# sourceMappingURL=script.js.map