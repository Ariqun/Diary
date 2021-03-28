export default class Calendar {
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

			for(let array of matrix) {
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
		this.diary.querySelectorAll('td .item').forEach((td) => {
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

		this.diary.querySelectorAll('.changeMonth').forEach((arrow) => {
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