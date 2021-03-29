import Modal from "./modal";

export default class Day {
	constructor(day) {
		this.day = day;
	}

	createDay() {
		const day = document.createElement('div');
			  day.classList.add('day');
		
		day.appendChild(this.day);
		document.querySelector('.diary').appendChild(day);
	}

	centeringNumberOfDay() {
		const top = document.querySelector('.dateDay').getBoundingClientRect();

		console.log(top);
	}

	createGraph() {
		const table = document.createElement('table');

		for (let i = 1; i <= 24; i++) {
			const tr = document.createElement('tr');
			const td = document.createElement('td');
			const time = document.createElement('div');
				  time.classList.add('time');
			
			time.innerHTML = `${addZero(i)}:00`;
			tr.append(time, td);
			table.appendChild(tr);
		}

		function addZero(num) {
			if (num < 10) {
				return `0${num}`;
			} else {
				return num;
			}
		}

		document.querySelector('.day').prepend(table);
	}

	createListeners() {
		document.querySelector('.day').addEventListener('scroll', () => {
			const px = document.querySelector('.day').scrollTop;
			document.querySelector('.day .dateDay').style.top = `calc(50% - ${200 - px}px)`;
		});

		document.querySelectorAll('.day td').forEach((time) => {
			time.addEventListener('click', () => {
				new Modal(time).init();
			});
		});
	}


	init() {
		this.createDay();
		this.centeringNumberOfDay();
		this.createGraph();
		this.createListeners();
	}
}