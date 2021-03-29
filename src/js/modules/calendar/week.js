export default class Week {
	constructor(week) {
		this.week = week;
	}

	createWeek() {
		const arrOfDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
		const week = document.createElement('div');
			  week.classList.add('week');
		const table = document.createElement('table');
		const thead = document.createElement('thead');
		const tbody = document.createElement('tbody');

		for (let elem of arrOfDays) {
			const th = document.createElement('th');

			th.innerHTML = elem;

			thead.appendChild(th);
		}

		tbody.appendChild(this.week);
		table.append(thead, tbody);
		week.appendChild(table);
		document.querySelector('.diary').appendChild(week);
	}

	init() {
		this.createWeek();
	}
}