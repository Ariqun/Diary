import Matrix from "./matrix";
import CalendarDOM from "./calendarDOM";
import Day from "./day";
import checkLocalStorage from "../localStorage";
import LeftSide from "../left_side";

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
		const showAndHideHoverAnimation = () => {
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
		};
		
		const displayChosenDay = () => {
			this.container.querySelectorAll('.dateDay').forEach((day) => {
				day.addEventListener('click', () => {
					const clone = day.cloneNode(true);
	
					this.clear();
					new Day(this.date, clone).init();
					document.querySelector('.diary').style.flexGrow = '1';
				});
			});
		};

		const backToMainScreen = () => {
			document.querySelector('header .title').addEventListener('click', () => {
				const date = new Date();
		
				this.clear();
				new Calendar(this.selector, date).init();
			});
		};

		const changeMonth = () => {
			document.querySelectorAll('header .change_month').forEach((arrow) => {
				arrow.addEventListener('click', () => {
					const arrOfTypes = new LeftSide().checkSelectTypes();

					let date;
	
					if (arrow.classList.contains('prev_month')) {
						date = new Date(this.date.getFullYear(), this.date.getMonth() - 1);
					} else {
						date = new Date(this.date.getFullYear(), this.date.getMonth() + 1);
					}
		
					this.clear();
					this.createCalendar(date);
					checkLocalStorage('month', this.date, arrOfTypes);
					showAndHideHoverAnimation();
					displayChosenDay();
				});
			});
		};

		showAndHideHoverAnimation();
		displayChosenDay();
		backToMainScreen();
		changeMonth();
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

	clear() {
		this.container.innerHTML = '';
		document.querySelector('.diary').style = '';
		document.querySelectorAll('.day').forEach(item => item.remove());
	}

	init() {
		this.createCalendar(this.date);
		checkLocalStorage('month', this.date, ['task', 'reminder', 'meeting']);
		this.createListeners();
	}
}