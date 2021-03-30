import checkLocalStorage from '../localStorage';

export default class Modal {
	constructor(date, time, row) {
		this.date = date;
		this.time = time;
		this.row = row;
		this.typeOfNote = 'task';
	}

	createModal() {
		const wrapper = document.createElement('div'); 
			  wrapper.classList.add('modal_wrapper');

		wrapper.innerHTML = `
			<div class="modal add_event">
				<div class="user_event_name">
					<input type="text" placeholder="Введите название">
				</div>

				<div class="events_name">
					<div class="event event_task active">
						<span>Задача</span>
					</div>

					<div class="event event_reminder">
						<span>Напоминание</span>
					</div>

					<div class="event event_meet">
						<span>Встреча</span>
					</div>
				</div>
			
				<div class="event_options">
					${this.createTask()}
				</div>
			</div>
		`;

		document.body.appendChild(wrapper);
	}

	createTask() {
		const task = `
			<div class="modal_task">
				<div class="modal_date_and_time">
					<div class="modal_date">
						${this.createDate()}
					</div>

					<div class="modal_time">
						<input type="text" value="${this.time}">
					</div>

					<label for="wholeDay"><input type="checkbox" name="wholeDay">Весь день</label>
				</div>

				<div class="task_descr">
					<textarea placeholder="Описание задачи"></textarea>
				</div>

				<button class="modal_save">Записать</button>
			</div>
		`;

		return task;
	}

	createReminder() {
		const reminder = `
			<div class="modal_reminder">
				<div class="modal_date_and_time">
					<div class="modal_date">
						${this.createDate()}
					</div>

					<div class="modal_time">
						<input type="text" value="${this.time}">
					</div>

					<label for="wholeDay"><input type="checkbox" name="wholeDay">Весь день</label>
				</div>

				<button class="modal_save">Записать</button>
			</div>
		`;

		return reminder;
	}

	createTimeList() {
		const hour = this.time.substr(0, 3);

		const select = `
			<select>
				<option>${hour}00</option>
				<option>${hour}10</option>
				<option>${hour}20</option>
				<option>${hour}30</option>
				<option>${hour}40</option>
				<option>${hour}50</option>
			</select>
		`;
		return select;
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

	checkTimeInInput() {
		document.querySelector('.modal_time input').addEventListener('change', () => {
			const str = document.querySelector('.modal_time input').value;
			
		});
	}

	saveNote() {
		document.querySelector('.modal_save').addEventListener('click', () => {
			const name = document.querySelector('.user_event_name input').value;
			const time = document.querySelector('.modal_time input').value;
			const descr = document.querySelector('.task_descr textarea').value;
			const note = `${this.typeOfNote}_${this.createDate('localStorage')}_${time}`;
			// Такой тип даты нужен для сравнения и вывода нужных элементов из localStorage
			const dateForLocalStorage = `${this.date.getDate()}.${this.date.getMonth()}.${this.date.getFullYear()}`;

			const obj = {
				'id': note,
				'name': name,
				'time': time,
				'descr': descr,
				'date': dateForLocalStorage
			};

			localStorage.setItem(note, JSON.stringify(obj));

			document.querySelector('.modal_wrapper').remove();

			checkLocalStorage(dateForLocalStorage);
		});
	}

	init() {
		this.createModal();
		this.createTimeList();
		this.checkTimeInInput();
		this.saveNote();
	}
}