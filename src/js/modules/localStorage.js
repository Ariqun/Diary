'use strict';

const checkLocalStorage = (date) => {
	const obj = {...localStorage};

	for (let key in obj) {
		const eventType = key.split('_')[0];

		pushEvent(date, eventType, JSON.parse(obj[key]));
	}
};

function pushEvent(date, type, obj) {
	document.querySelectorAll('.time').forEach((time) => {
		const hourRow = time.innerHTML.substr(0, 2);
		const hourInDB = obj.time.substr(0, 2);

		if (date == obj.date) {
			if (hourRow == hourInDB) {
				const item = document.createElement('div');
					  item.classList.add('static_wrapper');
				 	  item.innerHTML = createDOM(type, obj);

				time.nextElementSibling.querySelector('.inner_wrapper').appendChild(item);
			}
		}
	});
}

function createDOM(type, obj) {
	const node = `
		<div id="${obj.id}" class="sticker ${type}_sticker">
			<div class="event_name">${obj.name}
				<div class="event_time">
					<span>[</span>${obj.time}<span>]</span>
				</div>
			</div>
			
			<div class="sticker_extend hidden">
				${createTaskExtend(type, obj)}
			</div>

			<div class="arrow_dialog"></div>
		</div>
	`;

	return node;
}

function createTaskExtend(type, obj) {
	let ex = '';

	if (type == 'task') {
		ex = `<div class="descr">${obj.descr}</div>`;
	} else if (type == 'meeting') {
		const people = obj.people.join(', ');

		ex = `
			<div class="people">${people}</div>
			<div class="location">${obj.location}</div>
			<div class="descr">${obj.descr}</div>
		`;
	} else if (type == 'reminder') {
		ex = '';
	}

	return ex;
}

export default checkLocalStorage;