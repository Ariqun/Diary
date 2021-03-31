import Matrix from "./matrix";
import CalendarDOM from "./calendarDOM";
import Day from "./day";

export default class Calendar {
	constructor(selector, date) {
		this.selector = selector;
		this.container = document.querySelector(selector);
		this.date = date;
	}

	createCalendar(date) {
		this.date = date;
		this.container.style = '';

		const matrix = new Matrix(date).init();
		new CalendarDOM(this.selector, matrix, date).init();
	}

	createListeners() {
		// Реализуем анимацию на ячейках календаря при наведении
		this.container.querySelectorAll('.calendar_big .item').forEach((item) => {
			item.addEventListener('mouseover', () => {
				item.classList.add('hover');
				this.createPerspectiveAnimation(item);

				item.querySelectorAll('.small_sticker').forEach((stick) => {
					stick.innerHTML = `
						${stick.getAttribute('data-name')} <span>[</span>${stick.getAttribute('data-time')}<span>]</span>
					`;
				});
			});

			item.addEventListener('mouseout', () => {
				item.classList.remove('hover');

				item.querySelectorAll('.small_sticker').forEach((stick) => {
					stick.innerHTML = stick.getAttribute('data-time');
				});
			});
		});

		// Листаем месяцы в календаре
		document.querySelectorAll('header .change_month').forEach((arrow) => {
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
		});

		// Показываем выбранный день
		this.container.querySelectorAll('.dateDay').forEach((day) => {
			day.addEventListener('click', () => {
				const clone = day.cloneNode(true);

				this.clear();
				new Day(this.date, clone).init();
				this.container.style.flexGrow = '1';
			});
		});

		// Возвращаемся на главную
		document.querySelector('header .title').addEventListener('click', () => {
			const date = new Date();
	
			this.clear();
			new Calendar(this.selector, date).init();
		});
	}

	// Анимация каждой ячейки календаря при наведениее мышки
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
		const obj = {...localStorage};

		for (let key in obj) {
			const typeOfNote = key.split('_')[0];
			const date = key.split('_')[1];
			const month = date.split('.')[1];
			const day = date.split('.')[0];

			if (this.date.getMonth() == month) {
				document.querySelectorAll('.calendar_big .dateDay').forEach((dateDay) => {
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