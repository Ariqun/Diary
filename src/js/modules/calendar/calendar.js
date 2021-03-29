import Matrix from "./matrix";
import CalendarDOM from "./calendarDOM";
import Week from "./week";
import Day from "./day";

export default class Calendar {
	constructor(selector, date) {
		this.diary = document.querySelector(selector);
		this.date = date;
	}

	createCalendar(date) {
		this.date = date;

		const matrix = new Matrix(date).init();
		
		new CalendarDOM('.diary', matrix, date).init();
	}

	createListeners() {
		// Реализуем анимацию на ячейках календаря при наведении
		this.diary.querySelectorAll('.calendar .item').forEach((item) => {
			item.addEventListener('mouseover', () => {
				item.classList.add('hover');
				this.createPerspectiveAnimation(item);
			});

			item.addEventListener('mouseout', () => {
				item.classList.remove('hover');
			});
		});

		// Листаем месяцы в календаре
		document.querySelectorAll('header .changeMonth').forEach((arrow) => {
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
		});

		// Показываем выбранную неделю
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
		this.diary.querySelectorAll('.dateDay').forEach((day) => {
			day.addEventListener('click', () => {
				const clone = day.cloneNode(true);
				
				this.clear();

				new Day(clone).init();
				document.querySelector('.diary').style.flexGrow = '1';
			});
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

	// createWeekArrows() {
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
		this.createCalendar(this.date);
		// this.createWeekArrows();
		this.createListeners();
	}
}