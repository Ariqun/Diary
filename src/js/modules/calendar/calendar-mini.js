import CalendarDOM from "./calendarDOM";
import Matrix from "./matrix";

export default class CalendarMini {
	constructor(selector, date) {
		this.container = document.querySelector(selector);
		this.selector = selector;
		this.date = date;
	}

	createSmallCalendar(date) {
		this.date = date;
		const matrix = new Matrix(this.date).init();

		new CalendarDOM(this.selector, matrix, date, 'mini').init();
	}

	createListeners() {
		document.querySelectorAll('.wrapper_for_small_calendar .change_month').forEach((arrow) => {
			arrow.addEventListener('click', () => {
				let date;
				
				if (arrow.classList.contains('prev_month')) {
					date = new Date(this.date.getFullYear(), this.date.getMonth() - 1);
				} else {
					date = new Date(this.date.getFullYear(), this.date.getMonth() + 1);
				}

				this.remove();
				this.createSmallCalendar(date);
			});
		});
	}

	remove() {
		this.container.innerHTML = '';
		document.querySelectorAll('.wrapper_for_small_calendar .month').innerHTML = '';
	}

	init() {
		this.createSmallCalendar(this.date);
		this.createListeners();
	}
}