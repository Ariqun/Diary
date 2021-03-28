'use strict';

import Calendar from "./modules/calendar";

window.addEventListener('DOMContentLoaded', () => {
	const date = new Date();

	new Calendar('.diary', date).init();

});