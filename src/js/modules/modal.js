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
					} else if (btn.id == 'event_meeting') {
						this.eventType = 'meeting';
						this.createMeeting();
						this.showAdressSuggestions();
					} else if (btn.id == 'event_birthday') {
						this.eventType = 'birthday';
						this.createBirthday();
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
				const taskDescr = document.querySelector('.task_descr textarea');

				const people = document.querySelector('.meeting_people input');
				const loc = document.querySelector('.meeting_location input');
				const meetingDescr = document.querySelector('.meeting_descr input');

				const person = document.querySelector('.birthday_person input');
				const birthdayDate = document.querySelector('.birthday_date input');
				const present = document.querySelector('.birthday_present input');

				let type = '';

				document.querySelectorAll('.modal_add_event .event').forEach((item) => {
					if (item.classList.contains('active')) {
						type = item.id.split('_')[1];
					}
				});

				if (present && present.value == '') {
					present.value = 'Подарок не выбран';
				}


				if (name.value == '') {
					name.value == '' ? displayRedBorder(name) : null;
				} else if (type == 'task' && taskDescr.value == '') {
					taskDescr.value == '' ? displayRedBorder(taskDescr) : null;
				} else if (type == 'meeting' && (people.value == '' || loc.value == '' || meetingDescr.value == '')) {
					people.value == '' ? displayRedBorder(people) : null;
					loc.value == '' ? displayRedBorder(loc): null;
					meetingDescr.value == '' ? displayRedBorder(meetingDescr) : null;
				} else if (type == 'birthday' && (person.value == '' || birthdayDate.value == '')) {
					person.value  == '' ? displayRedBorder(person) : null;
					birthdayDate.value == '' ? displayRedBorder(birthdayDate) : null;
				} else {
					// Такой тип даты нужен для сравнения и вывода нужных элементов из localStorage
					const dateForLocalStorage = this.createDate('localStorage');
					const time = document.querySelector('.event_time input').value;
					const id = this.createID(time);

					const obj = {
						'id': id,
						'name': name.value,
						'time': time,
						'date': this.createDate()
					};

					if (this.eventType == 'task') {
						obj.descr = taskDescr.value;
					} else if (this.eventType == 'meeting') {
						obj.people = people.value.split(',');
						obj.location = loc.value;
						obj.descr = meetingDescr.value;
					} else if (this.eventType == 'birthday') {
						obj.person = person.value;
						obj.birthDate = birthdayDate.value.split('-').reverse().join('-');
						obj.present = present.value;
					}

					document.querySelectorAll('.day .sticker_wrapper').forEach(item => item.remove());
					document.querySelectorAll('.day .birthday_row').forEach(item => item.remove());
					document.querySelectorAll('.modal_wrapper input').forEach(input => input.value = '');
					document.querySelector('.modal_wrapper').classList.add('hidden');

					localStorage.setItem(id, JSON.stringify(obj));
					checkLocalStorage('day', dateForLocalStorage);

					new Stickers().init();
				}
			});

			function displayRedBorder(elem) {
				elem.classList.add('red_border_bottom');
				setTimeout(() => {elem.classList.remove('red_border_bottom');}, 2000);
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
					<label><input class="def_input" type="text" placeholder="Укажите имена через запятую"></label>
				</div>

				<div class="meeting_location">
					<label><input class="def_input" type="text" placeholder="Укажите место встречи"></label>
					<div class="suggestions"></div>
				</div>

				<div class="meeting_descr">
					<label><input class="def_input" type="text" placeholder="Добавьте описание"></label>
				</div>
			</div>
		`;
	}

	createBirthday() {
		this.block.innerHTML = `
			<div class="event_birthday">
				<div class="birthday_person">
					<label><input class="def_input" type="text" placeholder="Укажите имя именинника или именинницы"></label>
				</div>

				<div class="birthday_date">
					<label>Укажите дату рождения <input class="def_input" type="date"></label>
				</div>

				<div class="birthday_present">
					<label><input class="def_input" type="text" placeholder="Уже выбрали подарок?"></label>
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

	showAdressSuggestions() {
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
	}

	createID(time){
		const obj = {...localStorage};
		let id = '';
		let objOfTypes = {
			'task': 0,
			'reminder': 0,
			'meeting': 0,
			'birthday': 0
		};

		try {
			for (let key in obj) {
				const str = JSON.parse(obj[key]).id.split('_')[0];
	
				for (let type in objOfTypes) {
					str == type ? objOfTypes[type]++ : null;
				}
			}
		} catch {}

		for (let type in objOfTypes) {
			if (this.eventType == type) {
				id = `${this.eventType}_${this.createDate('localStorage')}_${time}_${objOfTypes[type] + 1}`;
			}
		}

		return id;
	}

	checkTimeInInput() {
		const timeInput = document.querySelector('.event_time input');
		const defaultTime = timeInput.value;

		timeInput.addEventListener('blur', () => {
			const changedTime = timeInput.value;

			if (changedTime == defaultTime || changedTime.length < 5) {
				timeInput.value = defaultTime;
			} else {
				const strOnlyNumbs = changedTime.replace(/\D+/g, '');
				const strFourNumbs = strOnlyNumbs.substr(0, 4);
				const result = strFourNumbs.replace(/(\d{2})(\d{2})/, (match, m1, m2) => {return `${m1}:${m2}`;});

				timeInput.value = result;
			}
		});
	}

	init() {
		this.createModal();
		this.createListeners();
		this.checkTimeInInput();
	}
}