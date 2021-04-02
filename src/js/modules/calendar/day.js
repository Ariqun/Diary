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
		
						new Modal(choiceDate, time, row).init();
					}
				});
			});
		};
	
		const showAndHideExtendSticker = () => {
			document.querySelectorAll('.day .sticker').forEach((sticker) => {
				const extend = sticker.querySelector('.sticker_extend');
				const eventName = sticker.querySelector('.event_name');

				sticker.addEventListener('mouseover', () => {
					extend.classList.remove('hidden');
					eventName.innerText = eventName.getAttribute('data-fullName');

					sticker.style.cssText = `
						position: absolute;
						min-height: 80px;
						font-size: 18px;
						padding: 7px;
						border: 1px solid rgba(0, 0, 0, 0.5);
						box-shadow: 0px 2px 10px 0px black;
						z-index: 1;
					`;

					sticker.closest('.sticker_wrapper').style.width = `${sticker.getBoundingClientRect().width + 25}px`;
				});
	
				sticker.addEventListener('mouseout', () => {
					extend.classList.add('hidden');
					eventName.innerText = eventName.getAttribute('data-shortName');

					sticker.style.cssText = '';
					sticker.closest('.sticker_wrapper').style.width = '';
				});
			});
		};

		scrollDateWithScreen();
		displayModal();
		showAndHideExtendSticker();
	}

	init() {
		// Такой тип даты нужен для сравнения и вывода нужных элементов из localStorage
		const dateForLocalStorage = `${this.day.innerHTML}.${this.date.getMonth()}.${this.date.getFullYear()}`;

		this.createDay();
		this.createGraph();

		checkLocalStorage('day', dateForLocalStorage);

		this.createListeners();
	}
}