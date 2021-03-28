'use strict';

import Calendar from "./modules/calendar/calendar";
import CalendarMini from "./modules/calendar/calendar-mini";

window.addEventListener('DOMContentLoaded', () => {
	const date = new Date();

	new Calendar('.diary', date).init();
	new CalendarMini('.left_side', date).init();

});