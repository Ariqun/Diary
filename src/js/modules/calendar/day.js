import checkLocalStorage from "../localStorage";
import Modal from "../modal";
import Stickers from "./stickers";

export default class Day {
	constructor(date, day) {
		this.date = date;
		this.day = day;
		// Такой тип даты нужен для сравнения и вывода нужных элементов из localStorage
		this.dateForLocalStorage = `${this.day.innerHTML}.${this.date.getMonth()}.${this.date.getFullYear()}`;
	}

	createDay() {
		const day = document.createElement('div');
			  day.classList.add('day');

		day.appendChild(this.day);
		document.querySelector('.diary').appendChild(day);
	}

	createGraph() {
		const table = document.createElement('table');

		for (let i = 1; i <= 24; i++) {
			const tr = document.createElement('tr');
			const td = document.createElement('td');
			const time = document.createElement('div');
				  time.classList.add('time');
			
			time.innerHTML = `${addZero(i)}:00`;
			td.innerHTML = `<div class="inner_wrapper"></div>`;

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
		const scrollDateWithScreen = () => {
			document.querySelector('.day').addEventListener('scroll', () => {
				const px = document.querySelector('.day').scrollTop;
				document.querySelector('.day .dateDay').style.top = `calc(50% - ${200 - px}px)`;
			});
		};
		
		const displayModal = () => {
			document.querySelectorAll('.day td').forEach((row) => {
				row.addEventListener('click', (e) => {
					if (e.target.classList.contains('inner_wrapper')) {
						const time = row.previousElementSibling.innerHTML;
						const choiceDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.day.innerHTML);

						document.querySelectorAll('.event_types .event').forEach((item) => {
							item.classList.remove('active');

							item.id == 'event_task' ? item.classList.add('active') : null;
						});
		
						new Modal(choiceDate, time, row).init();
					}
				});
			});
		};

		scrollDateWithScreen();
		displayModal();
		new Stickers().init();
	}

	init() {
		this.createDay();
		this.createGraph();

		checkLocalStorage('day', this.dateForLocalStorage);

		this.createListeners();
	}
}