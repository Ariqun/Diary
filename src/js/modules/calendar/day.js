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
				row.addEventListener('click', () => {
					const time = row.previousElementSibling.innerHTML;
	
					const choiceDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.day.innerHTML);
	
					new Modal(choiceDate, time, row).init();
				});
			});
		};
	
		const showAndHideExtendSticker = () => {
			document.querySelectorAll('.day .sticker').forEach((task) => {
				const extend = task.querySelector('.sticker_extend');
	
				task.addEventListener('mouseover', () => {
					const stickerWidth = task.offsetWidth;
					const posTd = task.closest('td').getBoundingClientRect().left;
					const posSticker = task.getBoundingClientRect().left;
	
					extend.classList.remove('hidden');
	
					task.closest('.static_wrapper').style.width = `${stickerWidth + 20}px`;
	
					task.style.cssText = `
						position: absolute;
						left: ${posSticker - posTd}px;
						min-height: 80px;
						font-size: 18px;
						padding: 10px 10px;
						z-index: 1;
					`;
				});
	
				// task.addEventListener('mouseout', () => {
				// 	extend.classList.add('hidden');
				// 	task.classList.remove('arrow_dialog');
	
				// 	task.closest('.static_wrapper').style.width = '';
	
				// 	task.style.cssText = '';
				// });
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

		checkLocalStorage(dateForLocalStorage);

		this.createListeners();
	}
}