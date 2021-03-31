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
    // Реализуем анимацию на ячейках календаря при наведении
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
    }); // Листаем месяцы в календаре

    document.querySelectorAll('header .change_month').forEach(arrow => {
      arrow.addEventListener('click', () => {
        let date;

        if (arrow.classList.contains('prev_month')) {
          date = new Date(this.date.getFullYear(), this.date.getMonth() - 1);
        } else {
          date = new Date(this.date.getFullYear(), this.date.getMonth() + 1);
        }

        this.clear();
        this.createCalendar(date);
        this.loadLocalStorage();
      });
    }); // Показываем выбранный день

    this.container.querySelectorAll('.dateDay').forEach(day => {
      day.addEventListener('click', () => {
        const clone = day.cloneNode(true);
        this.clear();
        new _day__WEBPACK_IMPORTED_MODULE_2__["default"](this.date, clone).init();
        this.container.style.flexGrow = '1';
      });
    }); // Возвращаемся на главную

    document.querySelector('header .title').addEventListener('click', () => {
      const date = new Date();
      this.clear();
      new Calendar(this.selector, date).init();
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
  }

  loadLocalStorage() {
    const obj = { ...localStorage
    };

    for (let key in obj) {
      const typeOfNote = key.split('_')[0];
      const date = key.split('_')[1];
      const month = date.split('.')[1];
      const day = date.split('.')[0];

      if (this.date.getMonth() == month) {
        document.querySelectorAll('.calendar_big .dateDay').forEach(dateDay => {
          if (dateDay.innerHTML == day) {
            const sticker = createStickers(typeOfNote, JSON.parse(obj[key]));
            dateDay.previousElementSibling.prepend(sticker);
          }
        });
      }
    }

    function createStickers(type, obj) {
      const smallSticker = document.createElement('div');
      smallSticker.classList.add(`${type}_small_sticker`, 'small_sticker');
      smallSticker.setAttribute('data-name', obj.name);
      smallSticker.setAttribute('data-time', obj.time);
      smallSticker.innerHTML = `${obj.time}`;
      return smallSticker;
    }
  }

  clear() {
    this.container.innerHTML = '';
    document.querySelectorAll('header .month').forEach(item => item.innerHTML = '');
  }

  init() {
    this.createCalendar(this.date);
    this.loadLocalStorage();
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
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../localStorage */ "./src/js/modules/localStorage.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./src/js/modules/calendar/modal.js");


class Day {
  constructor(date, day) {
    this.date = date;
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
    document.querySelector('.day').addEventListener('scroll', () => {
      const px = document.querySelector('.day').scrollTop;
      document.querySelector('.day .dateDay').style.top = `calc(50% - ${200 - px}px)`;
    });
    document.querySelectorAll('.day td').forEach(row => {
      row.addEventListener('click', () => {
        const time = row.previousElementSibling.innerHTML;
        const choiceDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.day.innerHTML);
        new _modal__WEBPACK_IMPORTED_MODULE_1__["default"](choiceDate, time, row).init();
      });
    });
    document.querySelectorAll('.day .task_sticker').forEach(task => {
      const descr = task.querySelector('.task_descr');
      task.addEventListener('mouseover', () => {
        const stickerWidth = task.offsetWidth;
        const posTd = task.closest('td').getBoundingClientRect().left;
        const posSticker = task.getBoundingClientRect().left;
        descr.classList.remove('hidden');
        task.classList.add('arrow_dialog');
        task.closest('.static_wrapper').style.width = `${stickerWidth + 20}px`;
        task.style.cssText = `
					position: absolute;
					left: ${posSticker - posTd}px;
					min-height: 80px;
					font-size: 18px;
					padding: 10px 10px;
					z-index: 1;
				`;
      });
      task.addEventListener('mouseout', () => {
        descr.classList.add('hidden');
        task.classList.remove('arrow_dialog');
        task.closest('.static_wrapper').style.width = '';
        task.style.cssText = '';
      });
    });
  }

  init() {
    // Такой тип даты нужен для сравнения и вывода нужных элементов из localStorage
    const dateForLocalStorage = `${this.day.innerHTML}.${this.date.getMonth()}.${this.date.getFullYear()}`;
    this.createDay();
    this.centeringNumberOfDay();
    this.createGraph();
    Object(_localStorage__WEBPACK_IMPORTED_MODULE_0__["default"])(dateForLocalStorage);
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

/***/ "./src/js/modules/calendar/modal.js":
/*!******************************************!*\
  !*** ./src/js/modules/calendar/modal.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Modal; });
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../localStorage */ "./src/js/modules/localStorage.js");

class Modal {
  constructor(date, time, row) {
    this.date = date;
    this.time = time;
    this.row = row;
    this.typeOfNote = 'task';
  }

  createModal() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('modal_wrapper');
    wrapper.innerHTML = `
			<div class="modal add_event">
				<div class="user_event_name">
					<input type="text" placeholder="Введите название">
				</div>

				<div class="events_name">
					<div class="event event_task active">
						<span>Задача</span>
					</div>

					<div class="event event_reminder">
						<span>Напоминание</span>
					</div>

					<div class="event event_meet">
						<span>Встреча</span>
					</div>
				</div>
			
				<div class="event_options">
					${this.createTask()}
				</div>
			</div>
		`;
    document.body.appendChild(wrapper);
  }

  createTask() {
    const task = `
			<div class="modal_task">
				<div class="modal_date_and_time">
					<div class="modal_date">
						${this.createDate()}
					</div>

					<div class="modal_time">
						<input type="text" value="${this.time}">
					</div>

					<label for="wholeDay"><input type="checkbox" name="wholeDay">Весь день</label>
				</div>

				<div class="task_descr">
					<textarea placeholder="Описание задачи"></textarea>
				</div>

				<button class="modal_save">Записать</button>
			</div>
		`;
    return task;
  }

  createReminder() {
    const reminder = `
			<div class="modal_reminder">
				<div class="modal_date_and_time">
					<div class="modal_date">
						${this.createDate()}
					</div>

					<div class="modal_time">
						<input type="text" value="${this.time}">
					</div>

					<label for="wholeDay"><input type="checkbox" name="wholeDay">Весь день</label>
				</div>

				<button class="modal_save">Записать</button>
			</div>
		`;
    return reminder;
  }

  createTimeList() {
    const hour = this.time.substr(0, 3);
    const select = `
			<select>
				<option>${hour}00</option>
				<option>${hour}10</option>
				<option>${hour}20</option>
				<option>${hour}30</option>
				<option>${hour}40</option>
				<option>${hour}50</option>
			</select>
		`;
    return select;
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
  }

  checkTimeInInput() {
    document.querySelector('.modal_time input').addEventListener('change', () => {
      const str = document.querySelector('.modal_time input').value;
    });
  }

  saveNote() {
    document.querySelector('.modal_save').addEventListener('click', () => {
      const name = document.querySelector('.user_event_name input').value;
      const time = document.querySelector('.modal_time input').value;
      const descr = document.querySelector('.task_descr textarea').value;
      const note = `${this.typeOfNote}_${this.createDate('localStorage')}_${time}`; // Такой тип даты нужен для сравнения и вывода нужных элементов из localStorage

      const dateForLocalStorage = `${this.date.getDate()}.${this.date.getMonth()}.${this.date.getFullYear()}`;
      const obj = {
        'id': note,
        'name': name,
        'time': time,
        'descr': descr,
        'date': dateForLocalStorage
      };
      localStorage.setItem(note, JSON.stringify(obj));
      document.querySelector('.modal_wrapper').remove();
      Object(_localStorage__WEBPACK_IMPORTED_MODULE_0__["default"])(dateForLocalStorage);
    });
  }

  init() {
    this.createModal();
    this.createTimeList();
    this.checkTimeInInput();
    this.saveNote();
  }

}

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

class LeftSide {
  constructor(container, date) {
    this.container = container;
    this.date = date;
  }

  init() {
    new _calendar_calendar_mini__WEBPACK_IMPORTED_MODULE_0__["default"]('.calendar_small', this.date).init();
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


const checkLocalStorage = date => {
  const obj = { ...localStorage
  };

  for (let key in obj) {
    const typeOfNote = key.split('_')[0];
    pushNote(date, typeOfNote, JSON.parse(obj[key]));
  }
};

function createDOM(type, obj) {
  let node = '';

  if (type == 'task') {
    node = `
			<div id="${obj.id}" class="${type}_sticker">
				<div class="${type}_name">${obj.name}
					<div class="${type}_time">
						<span>[</span>${obj.time}<span>]</span>
					</div>
				</div>
				
				<div class="${type}_descr hidden">${obj.descr}<div>
			</div>
		`;
  }

  return node;
}

function pushNote(date, type, obj) {
  document.querySelectorAll('.time').forEach(time => {
    const hourRow = time.innerHTML.substr(0, 2);
    const hourInDB = obj.time.substr(0, 2);

    if (date == obj.date) {
      if (hourRow == hourInDB) {
        const item = document.createElement('div');
        item.classList.add('static_wrapper');
        item.innerHTML = createDOM(type, obj);
        time.nextElementSibling.querySelector('.inner_wrapper').appendChild(item);
      }
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (checkLocalStorage);

/***/ })

/******/ });
//# sourceMappingURL=script.js.map