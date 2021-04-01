import checkLocalStorage from '../localStorage';

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
				// Такой тип даты нужен для сравнения и вывода нужных элементов из localStorage
				const dateForLocalStorage = this.createDate('localStorage');

				const name = document.querySelector('.user_event_name input').value;
				const time = document.querySelector('.event_time input').value;
				const id = `${this.eventType}_${this.createDate('localStorage')}_${time}`;
				
				const obj = {
					'id': id,
					'name': name,
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
	
				localStorage.setItem(id, JSON.stringify(obj));
	
				closeModal();
				checkLocalStorage(dateForLocalStorage);
			});
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