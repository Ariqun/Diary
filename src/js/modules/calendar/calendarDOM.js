export default class CalendarDOM {
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

		for(let array of this.matrix) {
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