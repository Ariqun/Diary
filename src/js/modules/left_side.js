import CalendarMini from './calendar/calendar-mini';
import checkLocalStorage from './localStorage';

export default class LeftSide {
	constructor(container, date) {
		this.container = container;
		this.date = date;
	}

	createListeners() {
		const hideAndShowEventTypes = () => {
			const selectEventTypes = () => {
				const arrOfTypes = this.checkSelectTypes();
				
				document.querySelectorAll('.small_sticker').forEach(sticker => sticker.remove());

				checkLocalStorage('month', this.date, arrOfTypes);
			};

			document.querySelectorAll('.left_side .option input').forEach((item) => {
				item.addEventListener('change', selectEventTypes);
			});
		};

		hideAndShowEventTypes();
	}

	checkSelectTypes() {
		const arrOfTypes = [];

		document.querySelectorAll('.left_side .option input').forEach((item) => {
			if (item.id == 'display_tasks' && item.checked == true) {
				arrOfTypes.push('task');
			} else if (item.id == 'display_reminders' && item.checked == true) {
				arrOfTypes.push('reminder');
			} else if (item.id == 'display_meetings' && item.checked == true) {
				arrOfTypes.push('meeting');
			}
		});

		return arrOfTypes;
	}

	init() {
		new CalendarMini('.calendar_small', this.date).init();

		this.createListeners();
	}
}