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
/* harmony import */ var _modules_left_side__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/left_side */ "./src/js/modules/left_side.js");




window.addEventListener('DOMContentLoaded', () => {
  const date = new Date();
  new _modules_left_side__WEBPACK_IMPORTED_MODULE_1__["default"]('.left_side', date).init();
  new _modules_calendar_calendar__WEBPACK_IMPORTED_MODULE_0__["default"]('.calendar_big', date).init();
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
    this.container = document.querySelector(selector);
    this.selector = selector;
    this.date = date;
  }

  createSmallCalendar(date) {
    this.date = date;
    const matrix = new _matrix__WEBPACK_IMPORTED_MODULE_1__["default"](this.date).init();
    new _calendarDOM__WEBPACK_IMPORTED_MODULE_0__["default"](this.selector, matrix, date, 'mini').init();
  }

  createListeners() {
    document.querySelectorAll('.wrapper_for_small_calendar .change_month').forEach(arrow => {
      arrow.addEventListener('click', () => {
        let date;

        if (arrow.classList.contains('prev_month')) {
          date = new Date(this.date.getFullYear(), this.date.getMonth() - 1);
        } else {
          date = new Date(this.date.getFullYear(), this.date.getMonth() + 1);
        }

        this.remove();
        this.createSmallCalendar(date);
      });
    });
  }

  remove() {
    this.container.innerHTML = '';
    document.querySelectorAll('.wrapper_for_small_calendar .month').innerHTML = '';
  }

  init() {
    this.createSmallCalendar(this.date);
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
/* harmony import */ var _day__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./day */ "./src/js/modules/calendar/day.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../localStorage */ "./src/js/modules/localStorage.js");
/* harmony import */ var _left_side__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../left_side */ "./src/js/modules/left_side.js");





class Calendar {
  constructor(selector, date) {
    this.selector = selector;
    this.container = document.querySelector(selector);
    this.date = date;
  }

  createCalendar(date) {
    this.date = date;
    this.container.style = '';
    const matrix = new _matrix__WEBPACK_IMPORTED_MODULE_0__["default"](date).init();
    new _calendarDOM__WEBPACK_IMPORTED_MODULE_1__["default"](this.selector, matrix, date).init();
  }

  createListeners() {
    const showAndHideHoverAnimation = () => {
      this.container.querySelectorAll('.calendar_big .item').forEach(item => {
        item.addEventListener('mouseover', () => {
          item.classList.add('hover');
          this.createPerspectiveAnimation(item);
          item.querySelectorAll('.small_sticker').forEach(stick => {
            stick.innerHTML = `
							${stick.getAttribute('data-name')} <span>[</span>${stick.getAttribute('data-time')}<span>]</span>
						`;
          });
        });
        item.addEventListener('mouseout', () => {
          item.classList.remove('hover');
          item.querySelectorAll('.small_sticker').forEach(stick => {
            stick.innerHTML = stick.getAttribute('data-time');
          });
        });
      });
    };

    const displayChosenDay = () => {
      this.container.querySelectorAll('.dateDay').forEach(day => {
        day.addEventListener('click', () => {
          const clone = day.cloneNode(true);
          this.clear();
          new _day__WEBPACK_IMPORTED_MODULE_2__["default"](this.date, clone).init();
          document.querySelector('.diary').style.flexGrow = '1';
        });
      });
    };

    const backToMainScreen = () => {
      document.querySelector('header .title').addEventListener('click', () => {
        const date = new Date();
        this.clear();
        new Calendar(this.selector, date).init();
      });
    };

    const changeMonth = () => {
      document.querySelectorAll('header .change_month').forEach(arrow => {
        arrow.addEventListener('click', () => {
          const arrOfTypes = new _left_side__WEBPACK_IMPORTED_MODULE_4__["default"]().checkSelectTypes();
          let date;

          if (arrow.classList.contains('prev_month')) {
            date = new Date(this.date.getFullYear(), this.date.getMonth() - 1);
          } else {
            date = new Date(this.date.getFullYear(), this.date.getMonth() + 1);
          }

          this.clear();
          this.createCalendar(date);
          Object(_localStorage__WEBPACK_IMPORTED_MODULE_3__["default"])('month', this.date, arrOfTypes);
          showAndHideHoverAnimation();
          displayChosenDay();
        });
      });
    };

    showAndHideHoverAnimation();
    displayChosenDay();
    backToMainScreen();
    changeMonth();
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
  }

  clear() {
    this.container.innerHTML = '';
    document.querySelector('.diary').style = '';
    document.querySelectorAll('.day').forEach(item => item.remove());
  }

  init() {
    this.createCalendar(this.date);
    Object(_localStorage__WEBPACK_IMPORTED_MODULE_3__["default"])('month', this.date, ['task', 'reminder', 'meeting']);
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
          table = document.createElement('table'),
          thead = document.createElement('thead'),
          tbody = document.createElement('tbody');
    let arrOfDays = [];

    if (this.size == 'big') {
      document.querySelector('.current_month .month').innerHTML = `${arrOfMonths[this.date.getMonth()]} ${this.date.getFullYear()}`;
      arrOfDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    } else {
      document.querySelector('.wrapper_for_small_calendar .month').innerHTML = `${arrOfMonths[this.date.getMonth()]} ${this.date.getFullYear()}`;
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
        const stickers = document.createElement('div');
        const dateDay = document.createElement('div');
        item.classList.add('item');
        stickers.classList.add('stickers');
        dateDay.classList.add('dateDay');

        if (array[i] == now.getDate() && this.date.getFullYear() == now.getUTCFullYear() && this.date.getMonth() == now.getMonth()) {
          dateDay.classList.add('today');
        }

        i == array.length - 1 || i == array.length - 2 ? dateDay.classList.add('weekend') : null;
        dateDay.innerHTML = array[i];
        item.append(stickers, dateDay);
        td.appendChild(item);
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    }

    table.append(thead, tbody);
    this.container.appendChild(table);
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
/* harmony import */ var _extend_stickers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../extend_stickers */ "./src/js/modules/extend_stickers.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../localStorage */ "./src/js/modules/localStorage.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modal */ "./src/js/modules/modal.js");



class Day {
  constructor(date, day) {
    this.date = date;
    this.day = day; // Такой тип даты нужен для сравнения и вывода нужных элементов из localStorage

    this.dateForLocalStorage = `${this.day.innerHTML}.${this.date.getMonth()}.${this.date.getFullYear()}`;
  }

  createDay() {
    const day = document.createElement('div');
    day.classList.add('day');
    day.appendChild(this.day);
    document.querySelector('.diary').appendChild(day);
  }

  createGraph() {
    const table = document.createElement('table');

    for (let i = 1; i <= 24; i++) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      const time = document.createElement('div');
      time.classList.add('time');
      time.innerHTML = `${addZero(i)}:00`;
      td.innerHTML = `<div class="inner_wrapper"></div>`;
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
    const scrollDateWithScreen = () => {
      document.querySelector('.day').addEventListener('scroll', () => {
        const px = document.querySelector('.day').scrollTop;
        document.querySelector('.day .dateDay').style.top = `calc(50% - ${200 - px}px)`;
      });
    };

    const displayModal = () => {
      document.querySelectorAll('.day td').forEach(row => {
        row.addEventListener('click', e => {
          if (e.target.classList.contains('inner_wrapper')) {
            const time = row.previousElementSibling.innerHTML;
            const choiceDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.day.innerHTML);
            new _modal__WEBPACK_IMPORTED_MODULE_2__["default"](choiceDate, time, row).init();
          }
        });
      });
    };

    const deleteSticker = () => {
      document.querySelectorAll('.sticker .sticker_delete').forEach(del => {
        del.addEventListener('click', () => {
          const sticker = del.closest('.sticker');
          sticker.remove();
          localStorage.removeItem(sticker.id);
        });
      });
    };

    scrollDateWithScreen();
    displayModal();
    Object(_extend_stickers__WEBPACK_IMPORTED_MODULE_0__["default"])();
    deleteSticker();
  }

  init() {
    this.createDay();
    this.createGraph();
    Object(_localStorage__WEBPACK_IMPORTED_MODULE_1__["default"])('day', this.dateForLocalStorage);
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

    function removeEmptySubArrs() {
      let x = 0;

      for (let subArr of arr) {
        let counter = 0;

        for (let elem of subArr) {
          elem == '' ? counter++ : null;
          counter == 7 ? x++ : null;
        }
      }

      for (let i = 0; i < x; i++) {
        arr.pop();
      }
    }

    removeEmptySubArrs();
    return arr;
  }

  init() {
    return this.createCalendarMatrix();
  }

}

/***/ }),

/***/ "./src/js/modules/extend_stickers.js":
/*!*******************************************!*\
  !*** ./src/js/modules/extend_stickers.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


const showAndHideExtendSticker = () => {
  document.querySelectorAll('.day .sticker').forEach(sticker => {
    const extend = sticker.querySelector('.sticker_extend');
    const rules = sticker.querySelector('.sticker_rules');
    const eventName = sticker.querySelector('.event_name');
    sticker.addEventListener('mouseover', () => {
      extend.classList.remove('hidden');
      rules.classList.remove('hidden');
      eventName.innerText = eventName.getAttribute('data-fullName');
      sticker.style.cssText = `
				position: absolute;
				min-height: 80px;
				font-size: 18px;
				padding: 7px;
				border: 1px solid rgba(0, 0, 0, 0.5);
				box-shadow: 0px 2px 10px 0px black;
				z-index: 1;
			`;
      sticker.closest('.sticker_wrapper').style.width = `${sticker.getBoundingClientRect().width + 25}px`;
    });
    sticker.addEventListener('mouseout', () => {
      extend.classList.add('hidden');
      rules.classList.add('hidden');
      eventName.innerText = eventName.getAttribute('data-shortName');
      sticker.style.cssText = '';
      sticker.closest('.sticker_wrapper').style.width = '';
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (showAndHideExtendSticker);

/***/ }),

/***/ "./src/js/modules/left_side.js":
/*!*************************************!*\
  !*** ./src/js/modules/left_side.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LeftSide; });
/* harmony import */ var _calendar_calendar_mini__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calendar/calendar-mini */ "./src/js/modules/calendar/calendar-mini.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorage */ "./src/js/modules/localStorage.js");


class LeftSide {
  constructor(container, date) {
    this.container = container;
    this.date = date;
  }

  createListeners() {
    const hideAndShowEventTypes = () => {
      const selectEventTypes = () => {
        const arrOfTypes = this.checkSelectTypes();
        document.querySelectorAll('.small_sticker').forEach(sticker => sticker.remove());
        Object(_localStorage__WEBPACK_IMPORTED_MODULE_1__["default"])('month', this.date, arrOfTypes);
      };

      document.querySelectorAll('.left_side .option input').forEach(item => {
        item.addEventListener('change', selectEventTypes);
      });
    };

    hideAndShowEventTypes();
  }

  checkSelectTypes() {
    const arrOfTypes = [];
    document.querySelectorAll('.left_side .option input').forEach(item => {
      if (item.id == 'display_tasks' && item.checked == true) {
        arrOfTypes.push('task');
      } else if (item.id == 'display_reminders' && item.checked == true) {
        arrOfTypes.push('reminder');
      } else if (item.id == 'display_meetings' && item.checked == true) {
        arrOfTypes.push('meeting');
      }
    });
    return arrOfTypes;
  }

  init() {
    new _calendar_calendar_mini__WEBPACK_IMPORTED_MODULE_0__["default"]('.calendar_small', this.date).init();
    this.createListeners();
  }

}

/***/ }),

/***/ "./src/js/modules/localStorage.js":
/*!****************************************!*\
  !*** ./src/js/modules/localStorage.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


const checkLocalStorage = (mode, date, arrOfTypes) => {
  const obj = { ...localStorage
  };
  let arr = [];

  if (mode == 'day') {
    for (let key in obj) {
      const eventType = key.split('_')[0];
      createStickersForDay(date, eventType, JSON.parse(obj[key]));
    }
  } else if (mode == 'month') {
    for (let key in obj) {
      arr.push(JSON.parse(obj[key]));
    }

    createStickersForMonth(date, arr, arrOfTypes);
  }
};

function createStickersForDay(date, type, obj) {
  function pushEvent() {
    document.querySelectorAll('.time').forEach(time => {
      const hourRow = time.innerHTML.substr(0, 2);
      const hourInDB = obj.time.substr(0, 2);

      if (date == obj.date) {
        if (hourRow == hourInDB) {
          const item = document.createElement('div');
          item.classList.add('sticker_wrapper');
          item.innerHTML = createDOM();
          time.nextElementSibling.querySelector('.inner_wrapper').appendChild(item);
        }
      }
    });
  }

  function createDOM() {
    let shortName = createShortName(obj.name);
    const node = `
			<div id="${obj.id}" class="sticker ${type}_sticker">
				<div class="sticker_rules hidden">
					<div class="sticker_edit"><img src="/assets/icons/sticker_edit.png"></div>
					<div class="sticker_delete"><img src="/assets/icons/sticker_delete.png"></div>
				</div>

				<div class="event_header">
					<div class="event_name" data-shortName="${shortName}" data-fullName="${obj.name}">
						${shortName}
					</div>

					<div class="event_time">
						<span>[</span>${obj.time}<span>]</span>
					</div>
				</div>
				
				<div class="sticker_extend hidden">
					${createStickerExtend()}
				</div>
			</div>
		`;
    return node;
  }

  function createStickerExtend() {
    let ex = '';

    if (type == 'task') {
      ex = `<div class="descr">${obj.descr}</div>`;
    } else if (type == 'meeting') {
      const people = obj.people.join(', ');
      ex = `
				<div class="people"><span>Кто:</span>${people}</div>
				<div class="location"><span>Где:</span>${obj.location}</div>
				<div class="descr"><span>Что:</span>${obj.descr}</div>
			`;
    } else if (type == 'reminder') {
      ex = '';
    }

    return ex;
  }

  pushEvent();
}

function createStickersForMonth(date, arr, arrOfTypes) {
  let arrOfSortedByTypes = [];
  let arrOfIndexes = [];

  if (arrOfTypes != undefined) {
    for (let elem of arrOfTypes) {
      for (let el of arr) {
        const type = el.id.split('_')[0];

        if (elem == type) {
          arrOfSortedByTypes.push(el);
        }
      }
    }
  }

  arrOfSortedByTypes.sort(function (a, b) {
    let x = a.time.replace(/\D+/g, '');
    let y = b.time.replace(/\D+/g, '');
    return x - y;
  });
  let repeat = arrOfSortedByTypes.reduce((acc, el) => {
    acc[el.date] = (acc[el.date] || 0) + 1;

    if (acc[el.date] > 4) {
      arrOfIndexes.unshift(arrOfSortedByTypes.indexOf(el));
    }

    return acc;
  }, {}, null, 2);
  console.log(repeat);

  for (let index of arrOfIndexes) {
    arrOfSortedByTypes.splice(index, 1);
  }

  for (let obj of arrOfSortedByTypes) {
    const eventType = obj.id.split('_')[0];
    const fullDate = obj.id.split('_')[1];
    const month = fullDate.split('.')[1];
    const day = fullDate.split('.')[0];

    if (date.getMonth() == month) {
      document.querySelectorAll('.calendar_big .dateDay').forEach(item => {
        if (item.innerHTML == day) {
          const sticker = createStickers(eventType, obj);
          item.previousElementSibling.appendChild(sticker);

          for (let key in repeat) {
            if (key.split('.')[0] == day & key.split('.')[1] == month) {
              if (repeat[key] > 4) {
                console.log(repeat[key] - 4);
              }
            }
          }
        }
      });
    }
  }

  function createStickers(type, obj) {
    const smallSticker = document.createElement('div');
    let shortName = createShortName(obj.name);
    smallSticker.classList.add(`${type}_small_sticker`, 'small_sticker');
    smallSticker.setAttribute('data-name', shortName);
    smallSticker.setAttribute('data-time', obj.time);
    smallSticker.innerHTML = `${obj.time}`;
    return smallSticker;
  }
}

function createShortName(str) {
  let shortName = '';
  str.length > 22 ? shortName = `${str.substr(0, 19)}...` : shortName = str;
  return shortName;
}

/* harmony default export */ __webpack_exports__["default"] = (checkLocalStorage);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Modal; });
/* harmony import */ var _extend_stickers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extend_stickers */ "./src/js/modules/extend_stickers.js");
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorage */ "./src/js/modules/localStorage.js");


class Modal {
  constructor(date, time, row) {
    this.block = document.querySelector('.event_preferences');
    this.date = date;
    this.time = time;
    this.row = row;
    this.eventType = 'task';
  }

  createModal() {
    document.querySelector('.modal_wrapper').classList.remove('hidden');
    document.querySelector('.event_date').innerHTML = this.createDate();
    document.querySelector('.event_time input').value = this.time;
    this.createTask();
  }

  createListeners() {
    const eventBtns = document.querySelectorAll('.event');

    const switchTabs = () => {
      eventBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          eventBtns.forEach(item => item.classList.remove('active'));
          btn.classList.add('active');
          this.block.innerHTML = '';
          document.querySelector('.event_date').innerHTML = this.createDate();
          document.querySelector('.event_time input').value = this.time;

          if (btn.id == 'event_task') {
            this.eventType = 'task';
            this.createTask();
          } else if (btn.id == 'event_reminder') {
            this.eventType = 'reminder';
            this.createReminder();
          } else {
            this.eventType = 'meeting';
            this.createMeeting();
            showAdressSuggestions();
          }
        });
      });
    };

    const closeModal = () => {
      document.querySelector('.modal_close').addEventListener('click', () => {
        document.querySelector('.modal_wrapper').classList.add('hidden');
      });
    };

    const saveEvent = () => {
      document.querySelector('.event_save').addEventListener('click', () => {
        const name = document.querySelector('.user_event_name input');

        if (name.value == '') {
          name.style.borderBottom = '2px solid red';
          setTimeout(() => {
            name.style.cssText = '';
          }, 2000);
        } else {
          // Такой тип даты нужен для сравнения и вывода нужных элементов из localStorage
          const dateForLocalStorage = this.createDate('localStorage');
          const time = document.querySelector('.event_time input').value;
          const id = `${this.eventType}_${this.createDate('localStorage')}_${time}`;
          const obj = {
            'id': id,
            'name': name.value,
            'time': time,
            'date': dateForLocalStorage
          };

          if (this.eventType == 'task') {
            const descr = document.querySelector('.task_descr textarea').value;
            obj.descr = descr;
          } else if (this.eventType == 'meeting') {
            const location = document.querySelector('.meeting_location input').value;
            const descr = document.querySelector('.meeting_descr input').value;
            const peopleStr = document.querySelector('.meeting_people input').value;
            const people = peopleStr.split(',');
            obj.location = location;
            obj.descr = descr;
            obj.people = people;
          }

          document.querySelectorAll('.day .sticker_wrapper').forEach(item => item.remove());
          document.querySelectorAll('.modal_wrapper input').forEach(input => input.value = '');
          document.querySelector('.modal_wrapper').classList.add('hidden');
          localStorage.setItem(id, JSON.stringify(obj));
          Object(_localStorage__WEBPACK_IMPORTED_MODULE_1__["default"])('day', dateForLocalStorage);
          Object(_extend_stickers__WEBPACK_IMPORTED_MODULE_0__["default"])();
        }
      });
    };

    const showAdressSuggestions = () => {
      const sugBlock = document.querySelector('.meeting_location .suggestions');
      const input = document.querySelector('.meeting_location input');
      input.addEventListener('input', suggestion);

      function suggestion() {
        const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
        const token = "f7f2fe36a577281d7b497460fd089ee837097d0b";
        const query = input.value;
        const options = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
          },
          body: JSON.stringify({
            query: query
          })
        };
        fetch(url, options).then(response => response.text()).then(result => {
          const arr = JSON.parse(result).suggestions;
          sugBlock.innerHTML = '';

          for (let i = 0; i < 5; i++) {
            sugBlock.innerHTML += `
								<div class="suggestion">${arr[i].value}</div>
							`;
          }

          selectSuggestion();
        }).catch(error => console.log("error", error));
      }

      function selectSuggestion() {
        document.querySelectorAll('.meeting_location .suggestion').forEach(item => {
          item.addEventListener('click', () => {
            input.value = item.innerHTML;
            input.focus();
            sugBlock.innerHTML = '';
          });
        });
      }
    };

    switchTabs();
    closeModal();
    saveEvent();
  }

  createTask() {
    this.block.innerHTML = `
			<div class="event_task">
				<div class="task_descr">
					<textarea placeholder="Описание задачи"></textarea>
				</div>
			</div>
		`;
  }

  createReminder() {
    this.block.innerHTML = `
			<div class="event_reminder"></div>
		`;
  }

  createMeeting() {
    this.block.innerHTML = `
			<div class="event_meeting">
				<div class="meeting_people">
					<label><input type="text" placeholder="Укажите имена через запятую"></label>
				</div>

				<div class="meeting_location">
					<label><input type="text" placeholder="Укажите место встречи"></label>
					<div class="suggestions"></div>
				</div>

				<div class="meeting_descr">
					<label><input type="text" placeholder="Добавьте описание"></label>
				</div>
			</div>
		`;
  }

  createDate(mode = 'modal') {
    const arrOfMonths = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    const arrOfDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    const dayOfWeek = this.date.getDay();
    const day = this.date.getDate();
    let date = '';

    if (mode == 'modal') {
      date = `${arrOfDays[dayOfWeek - 1]}, ${day} ${arrOfMonths[month]} ${year}`;
    } else {
      date = `${day}.${month}.${year}`;
    }

    return date;
  } // checkTimeInInput() {
  // 	document.querySelector('.modal_time input').addEventListener('change', () => {
  // 		const str = document.querySelector('.modal_time input').value;
  // 	});
  // }


  init() {
    this.createModal();
    this.createListeners(); // this.checkTimeInInput();
  }

}

/***/ })

/******/ });
//# sourceMappingURL=script.js.map