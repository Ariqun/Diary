export default class Modal {
	constructor(time) {
		this.time = time;
	}

	createModal() {
		const wrapper = document.createElement('div'); 
			  wrapper.classList.add('modal_wrapper');

		wrapper.innerHTML = `
			<div class="modal add_event">
				<div class="user_event_name">
					<input type="text">
				</div>

				<div class="events_name">
					<div class="event_task">
						<span>Задача</span>
					</div>
					<div class="event_meet">
						<span>Встреча</span>
					</div>

					<div class="reminder">
						<span>Напоминание</span>
					</div>
				</div>
			
			</div>
		`;

		document.body.appendChild(wrapper);
	}

	init() {
		this.createModal();
	}
}