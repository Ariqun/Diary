export default class DOM {
	constructor(selector, matrix, date, mode = 'max') {
		this.container = document.querySelector(selector);
		this.matrix = matrix;
		this.date = date;
		this.mode = mode;
	}

	createDOM() {
		const arrOfMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
		const calendar = document.createElement('div');
		const table = document.createElement('table');
		const thead = document.createElement('thead');
		const tbody = document.createElement('tbody');
		const header = document.createElement('div');
		const month = document.createElement('div');
		const prevMonth = document.createElement('div');
		const nextMonth = document.createElement('div');
		let arrOfDays = [];

		if (this.mode == 'max') {
			arrOfDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
		} else {
			arrOfDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
		}
		
		for (let i = 0; i < arrOfDays.length; i++) {
			const th = document.createElement('th');

			th.innerHTML = arrOfDays[i];
			thead.appendChild(th);
		}

		for(let array of this.matrix) {
			const tr = document.createElement('tr');

			for (let i = 0; i < array.length; i++) {
				const now = new Date();
				const td = document.createElement('td');
				const item = document.createElement('div');
				const day = document.createElement('div');

				item.classList.add('item');
				day.classList.add('day');

				if (array[i] == now.getDate() && this.date.getFullYear() == now.getUTCFullYear() && this.date.getMonth() == now.getMonth()) {
					day.classList.add('today');
				}
				i == array.length - 1 || i == array.length - 2 ? day.classList.add('weekend') : null;

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

		month.innerHTML = arrOfMonths[this.date.getMonth()];
		if (arrOfMonths[this.date.getMonth() - 1] == undefined) {
			prevMonth.innerHTML = `<img src="/assets/icons/arrow-left.png"> ${arrOfMonths[arrOfMonths.length - 1]}`;
		} else {
			prevMonth.innerHTML = `<img src="/assets/icons/arrow-left.png"> ${arrOfMonths[this.date.getMonth() - 1]}`;
		}

		if (arrOfMonths[this.date.getMonth() + 1] == undefined) {
			nextMonth.innerHTML = `${arrOfMonths[0]} <img src="/assets/icons/arrow-right.png">`;
		} else {
			nextMonth.innerHTML = `${arrOfMonths[this.date.getMonth() + 1]} <img src="/assets/icons/arrow-right.png">`;
		}

		table.append(thead, tbody);
		calendar.appendChild(table);
		header.append(prevMonth, month, nextMonth);
		this.container.append(header, calendar);

	}

	init() {
		return this.createDOM();
	}
}