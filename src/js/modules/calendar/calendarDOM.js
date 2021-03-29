export default class CalendarDOM {
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

		for(let array of this.matrix) {
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