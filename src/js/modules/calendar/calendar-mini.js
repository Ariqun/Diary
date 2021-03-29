import CalendarDOM from "./calendarDOM";
import Matrix from "./matrix";

export default class CalendarMini {
	constructor(selector, date) {
		this.aside = document.querySelector(selector);
		this.selector = selector;
		this.date = date;
	}

	createCalendar(date) {
		this.date = date;
		const matrix = new Matrix(this.date).init();

		new CalendarDOM(this.selector, matrix, date, 'mini').init();

	}

	createListeners() {
		this.aside.querySelectorAll('.changeMonth').forEach((arrow) => {
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
		this.aside.innerHTML = '';
	}

	init() {
		this.createCalendar(this.date);
		this.createListeners();
	}
}