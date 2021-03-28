import DOM from "./dom";
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

		new DOM(this.selector, matrix, date, 'mini').init();

	}

	init() {
		this.createCalendar(this.date);
	}
}