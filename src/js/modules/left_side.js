import CalendarMini from './calendar/calendar-mini';

export default class LeftSide {
	constructor(container, date) {
		this.container = container;
		this.date = date;
	}

	init() {
		new CalendarMini('.calendar_small', this.date).init();
	}
}