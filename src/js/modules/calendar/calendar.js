import DOM from "./dom";
import Matrix from "./matrix";

export default class Calendar {
	constructor(selector, date) {
		this.diary = document.querySelector(selector);
		this.date = date;
	}

	createCalendar(date) {
		this.date = date;

		// Создаем массив с числами и пустыми строками как матрицу для календаря
		const matrix = new Matrix(date).init();
		
		// Создаем верстку календаря и наполняем ее интерактивом
		new DOM('.diary', matrix, date).init();
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
		this.diary.innerHTML = '';
	}

	init() {
		this.createCalendar(this.date);
		this.createListeners();
	}
}