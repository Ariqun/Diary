'use strict';

import Calendar from "./modules/calendar/calendar";
import LeftSide from "./modules/left_side";

window.addEventListener('DOMContentLoaded', () => {
	const date = new Date();

	new LeftSide('.left_side', date).init();
	new Calendar('.calendar_big', date).init();
	

});