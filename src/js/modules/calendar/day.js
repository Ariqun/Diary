import checkLocalStorage from "../localStorage";
import Modal from "./modal";

export default class Day {
	constructor(date, day) {
		this.date = date;
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
		document.querySelector('.day').addEventListener('scroll', () => {
			const px = document.querySelector('.day').scrollTop;
			document.querySelector('.day .dateDay').style.top = `calc(50% - ${200 - px}px)`;
		});

		document.querySelectorAll('.day td').forEach((row) => {
			row.addEventListener('click', () => {
				const time = row.previousElementSibling.innerHTML;

				const choiceDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.day.innerHTML);

				new Modal(choiceDate, time, row).init();
			});
		});

		document.querySelectorAll('.day .task').forEach((task) => {
			const descr = task.querySelector('.task_descr');

			task.addEventListener('mouseover', () => {
				const stickerWidth = task.offsetWidth;
				const posTd = task.closest('td').getBoundingClientRect().left;
				const posSticker = task.getBoundingClientRect().left;

				descr.classList.remove('hidden');
				task.classList.add('arrow_dialog');

				task.closest('.static_wrapper').style.width = `${stickerWidth}px`;

				task.style.cssText = `
					position: absolute;
					top: -15px;
					left: ${posSticker - posTd}px;
					min-height: 80px;
					font-size: 18px;
					z-index: 1;
				`;
			});

			task.addEventListener('mouseout', () => {
				descr.classList.add('hidden');
				task.classList.remove('arrow_dialog');

				task.closest('.static_wrapper').style.width = '';

				task.style.cssText = '';
			});
		});
	}

	init() {
		// Такой тип даты нужен для сравнения и вывода нужных элементов из localStorage
		const dateForLocalStorage = `${this.day.innerHTML}.${this.date.getMonth()}.${this.date.getFullYear()}`;

		this.createDay();
		this.centeringNumberOfDay();
		this.createGraph();

		checkLocalStorage(dateForLocalStorage);

		this.createListeners();
	}
}