import Stickers from "./calendar/stickers";
import checkLocalStorage from "./localStorage";

export default class Modal {
	constructor(date, time, row) {
		this.block = document.querySelector('.event_preferences');
		this.date = date;
		this.time = time;
		this.row = row;
		this.eventType = 'task';
	}

	createModal() {
		document.querySelector('.modal_wrapper').classList.remove('hidden');

		document.querySelector('.event_date').innerHTML = this.createDate();
		document.querySelector('.event_time input').value = this.time;

		this.createTask();
	}

	createListeners() {
		const eventBtns = document.querySelectorAll('.event');

		const switchTabs = () => {
			eventBtns.forEach((btn) => {
				btn.addEventListener('click', () => {
					eventBtns.forEach(item => item.classList.remove('active'));
					btn.classList.add('active');
	
					this.block.innerHTML = '';
	
					document.querySelector('.event_date').innerHTML = this.createDate();
					document.querySelector('.event_time input').value = this.time;
	
					if (btn.id == 'event_task') {
						this.eventType = 'task';
						this.createTask();
					} else if (btn.id == 'event_reminder') {
						this.eventType = 'reminder';
						this.createReminder();
					} else {
						this.eventType = 'meeting';
						this.createMeeting();
						showAdressSuggestions();
					}
				});
			});
		};
		
		const closeModal = () => {
			document.querySelector('.modal_close').addEventListener('click', () => {
				document.querySelector('.modal_wrapper').classList.add('hidden');
			});
		};

		const saveEvent = () => {
			document.querySelector('.event_save').addEventListener('click', () => {
				const name = document.querySelector('.user_event_name input');

				if (name.value == '') {
					name.style.borderBottom = '2px solid red';
					setTimeout(() => {name.style.cssText = '';}, 2000);
				} else {
					// Такой тип даты нужен для сравнения и вывода нужных элементов из localStorage
					const dateForLocalStorage = this.createDate('localStorage');
					const time = document.querySelector('.event_time input').value;
					const id = createID(time);

					const obj = {
						'id': id,
						'name': name.value,
						'time': time,
						'date': dateForLocalStorage
					};

					if (this.eventType == 'task') {
						const descr = document.querySelector('.task_descr textarea').value;

						obj.descr = descr;
					} else if (this.eventType == 'meeting') {
						const location = document.querySelector('.meeting_location input').value;
						const descr = document.querySelector('.meeting_descr input').value;
						const peopleStr = document.querySelector('.meeting_people input').value;
						const people = peopleStr.split(',');

						obj.location = location;
						obj.descr = descr;
						obj.people = people;
					}

					document.querySelectorAll('.day .sticker_wrapper').forEach(item => item.remove());
					document.querySelectorAll('.modal_wrapper input').forEach(input => input.value = '');
					document.querySelector('.modal_wrapper').classList.add('hidden');

					localStorage.setItem(id, JSON.stringify(obj));
					checkLocalStorage('day', dateForLocalStorage);

					new Stickers().init();
				}
			});

			const createID = (time) => {
				const obj = {...localStorage};
				let id = '';
				let objOfTypes = {
					'task': 0,
					'reminder': 0,
					'meeting': 0
				};

				for (let key in obj) {
					const str = JSON.parse(obj[key]).id.split('_')[0];

					for (let type in objOfTypes) {
						str == type ? objOfTypes[type]++ : null;
					}
				}

				for (let type in objOfTypes) {
					if (this.eventType == type) {
						id = `${this.eventType}_${this.createDate('localStorage')}_${time}_${objOfTypes[type] + 1}`;
					}
				}

				return id;
			};
		};

		const showAdressSuggestions = () => {
			const sugBlock = document.querySelector('.meeting_location .suggestions');
			const input = document.querySelector('.meeting_location input');
			input.addEventListener('input', suggestion);

			function suggestion() {
				const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
				const token = "f7f2fe36a577281d7b497460fd089ee837097d0b";
				const query = input.value;
	
				const options = {
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
						"Authorization": "Token " + token
					},
	
					body: JSON.stringify({query: query})
				};
	
				fetch(url, options)
					.then(response => response.text())
					.then((result) => {
						const arr = JSON.parse(result).suggestions;
						sugBlock.innerHTML = '';

						for (let i = 0; i < 5; i++) {
							if (arr[i]) {
								sugBlock.innerHTML += `
									<div class="suggestion">${arr[i].value}</div>
								`;
							}
						}

						selectSuggestion();
					})
					.catch(error => console.log("error", error));
			}

			function selectSuggestion() {
				document.querySelectorAll('.meeting_location .suggestion').forEach((item) => {
					item.addEventListener('click', () => {
						input.value = item.innerHTML;
						input.focus();
						
						sugBlock.innerHTML = '';
					});
				});
			}
		};
		
		switchTabs();
		closeModal();
		saveEvent();
	}

	createTask() {
		this.block.innerHTML = `
			<div class="event_task">
				<div class="task_descr">
					<textarea placeholder="Описание задачи"></textarea>
				</div>
			</div>
		`;
	}

	createReminder() {
		this.block.innerHTML = `
			<div class="event_reminder"></div>
		`;
	}

	createMeeting() {
		this.block.innerHTML = `
			<div class="event_meeting">
				<div class="meeting_people">
					<label><input type="text" placeholder="Укажите имена через запятую"></label>
				</div>

				<div class="meeting_location">
					<label><input type="text" placeholder="Укажите место встречи"></label>
					<div class="suggestions"></div>
				</div>

				<div class="meeting_descr">
					<label><input type="text" placeholder="Добавьте описание"></label>
				</div>
			</div>
		`;
	}

	createDate(mode = 'modal') {
		const arrOfMonths = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
		const arrOfDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
		const year = this.date.getFullYear();
		const month = this.date.getMonth();
		const dayOfWeek = this.date.getDay();
		const day = this.date.getDate();
		let date = '';

		if (mode == 'modal') {
			date = `${arrOfDays[dayOfWeek - 1]}, ${day} ${arrOfMonths[month]} ${year}`;
		} else {
			date = `${day}.${month}.${year}`; 
		}
		
		return date;
	}

	// checkTimeInInput() {
	// 	document.querySelector('.modal_time input').addEventListener('change', () => {
	// 		const str = document.querySelector('.modal_time input').value;
			
	// 	});
	// }

	init() {
		this.createModal();
		this.createListeners();
		// this.checkTimeInInput();
	}
}