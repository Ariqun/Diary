export default class Calendar {
	constructor(selector, date) {
		this.diary = document.querySelector(selector);
		this.date = date;
	}

	createCalendar(date) {
		this.date = date;

		// Создаем массив с числами и пустыми строками как матрицу для календаря
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
		
		// Создаем верстку календаря и наполняем ее интерактивом
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
		this.diary.querySelectorAll('td .item').forEach((item) => {
			item.addEventListener('mouseover', () => {
				item.classList.add('hover');
				this.perspectiveAnimation(item);
			});

			item.addEventListener('mouseout', () => {
				item.classList.remove('hover');
			});

			item.addEventListener('click', () => {
				console.log(item);
			});
		});

		// Листаем месяцы в календаре
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

	// Анимация каждой ячейки календаря при наведениее мышки
	perspectiveAnimation(item) {
		let flag = true;
		let degX = 0;
		let degY = 0;
		
		function animation() {
			if (flag == true) {
				degX += 0.1;
				degY += 0.1;
			} else {
				degY -= 0.1;
			}

			degX >= 20 ? degX = 20 : null;

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

	remove() {
		this.diary.querySelector('.diary_content').innerHTML = '';
	}

	init() {
		this.createCalendar(this.date);
		this.createListeners();
	}
}