'use strict';

const checkLocalStorage = (date) => {
	const obj = {...localStorage};

	for (let key in obj) {
		const typeOfNote = key.split('_')[0];

		pushNote(date, typeOfNote, JSON.parse(obj[key]));
	}
};

function createDOM(type, obj) {
	let node = '';

	if (type == 'task') {
		node = `
			<div id="${obj.id}" class="${type}_sticker">
				<div class="${type}_name">${obj.name}
					<div class="${type}_time">
						<span>[</span>${obj.time}<span>]</span>
					</div>
				</div>
				
				<div class="${type}_descr hidden">${obj.descr}<div>
			</div>
		`;
	}

	return node;
}

function pushNote(date, type, obj) {
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

export default checkLocalStorage;