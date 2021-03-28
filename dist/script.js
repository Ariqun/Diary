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
/* harmony import */ var _modules_calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calendar */ "./src/js/modules/calendar.js");



window.addEventListener('DOMContentLoaded', () => {
  const date = new Date();
  new _modules_calendar__WEBPACK_IMPORTED_MODULE_0__["default"]('.diary', date).init();
});

/***/ }),

/***/ "./src/js/modules/calendar.js":
/*!************************************!*\
  !*** ./src/js/modules/calendar.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Calendar; });
class Calendar {
  constructor(selector, date) {
    this.diary = document.querySelector(selector);
    this.date = date;
  }

  createCalendar(date) {
    this.date = date;

    function createCalendarMatrix() {
      const amountOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      const dayOfWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
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

    const createDOM = () => {
      const arrOfDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
      const arrOfMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
      const calendar = document.createElement('div');
      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const tbody = document.createElement('tbody');
      const header = document.createElement('div');
      const month = document.createElement('div');
      const prevMonth = document.createElement('div');
      const nextMonth = document.createElement('div');

      for (let i = 0; i < arrOfDays.length; i++) {
        const th = document.createElement('th');
        th.innerHTML = arrOfDays[i];
        thead.appendChild(th);
      }

      for (let array of matrix) {
        const tr = document.createElement('tr');

        for (let i = 0; i < array.length; i++) {
          const td = document.createElement('td');
          const item = document.createElement('div');
          const day = document.createElement('div');
          item.classList.add('item');
          day.classList.add('day');

          if (i == array.length - 1 || i == array.length - 2) {
            day.classList.add('weekend');
          }

          day.innerHTML = array[i];
          item.appendChild(day);
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
      month.innerHTML = arrOfMonths[date.getMonth()];

      if (arrOfMonths[date.getMonth() - 1] == undefined) {
        prevMonth.innerHTML = `<img src="/assets/icons/arrow-left.png"> ${arrOfMonths[arrOfMonths.length - 1]}`;
      } else {
        prevMonth.innerHTML = `<img src="/assets/icons/arrow-left.png"> ${arrOfMonths[date.getMonth() - 1]}`;
      }

      if (arrOfMonths[date.getMonth() + 1] == undefined) {
        nextMonth.innerHTML = `${arrOfMonths[0]} <img src="/assets/icons/arrow-right.png">`;
      } else {
        nextMonth.innerHTML = `${arrOfMonths[date.getMonth() + 1]} <img src="/assets/icons/arrow-right.png">`;
      }

      table.append(thead, tbody);
      calendar.appendChild(table);
      header.append(prevMonth, month, nextMonth);
      this.diary.querySelector('.diary_content').append(header, calendar);
    };

    const matrix = createCalendarMatrix();
    createDOM();
  }

  createListeners() {
    this.diary.querySelectorAll('td .item').forEach(td => {
      td.addEventListener('mouseover', () => {
        td.classList.add('hover');
      });
      td.addEventListener('mouseout', () => {
        td.classList.remove('hover');
      });
      td.addEventListener('click', () => {
        console.log(td);
      });
    });
    this.diary.querySelectorAll('.changeMonth').forEach(arrow => {
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
    this.diary.querySelector('.diary_content').innerHTML = '';
  }

  init() {
    this.createCalendar(this.date);
    this.createListeners();
  }

}

/***/ })

/******/ });
//# sourceMappingURL=script.js.map