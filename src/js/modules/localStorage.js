'use strict';

const checkLocalStorage = (mode, date, arrOfTypes) => {
	const obj = {...localStorage};
	let arr = [];

	if (mode == 'day') {
		for (let key in obj) {
			const eventType = key.split('_')[0];
	
			createStickersForDay(date, eventType, JSON.parse(obj[key]));
		}
	} else if (mode == 'month') {
		for (let key in obj) {
			arr.push(JSON.parse(obj[key]));
		}

		createStickersForMonth(date, arr, arrOfTypes);
	}
};

function createStickersForDay(date, type, obj) {
	function pushEvent() {
		document.querySelectorAll('.time').forEach((time) => {
			const hourRow = time.innerHTML.substr(0, 2);
			const hourInDB = obj.time.substr(0, 2);
	
			if (date == obj.date) {
				if (hourRow == hourInDB) {
					const item = document.createElement('div');
						  item.classList.add('sticker_wrapper');
						   item.innerHTML = createDOM();
	
					time.nextElementSibling.querySelector('.inner_wrapper').appendChild(item);
				}
			}
		});
	}
	
	function createDOM() {
		let shortName = createShortName(obj.name);

		const node = `
			<div id="${obj.id}" class="sticker ${type}_sticker">
				<div class="event_header">
					<div class="event_name" data-shortName="${shortName}" data-fullName="${obj.name}">
						${shortName}
					</div>

					<div class="event_time">
						<span>[</span>${obj.time}<span>]</span>
					</div>
				</div>
				
				<div class="sticker_extend hidden">
					${createStickerExtend()}
				</div>
			</div>
		`;
	
		return node;
	}
	
	function createStickerExtend() {
		let ex = '';
	
		if (type == 'task') {
			ex = `<div class="descr">${obj.descr}</div>`;
		} else if (type == 'meeting') {
			const people = obj.people.join(', ');
	
			ex = `
				<div class="people"><span>Кто:</span>${people}</div>
				<div class="location"><span>Где:</span>${obj.location}</div>
				<div class="descr"><span>Что:</span>${obj.descr}</div>
			`;
		} else if (type == 'reminder') {
			ex = '';
		}
	
		return ex;
	}

	pushEvent();
}

function createStickersForMonth(date, arr, arrOfTypes) {
	let arrOfSortedByTypes = [];
	let arrOfIndexes = [];
	
	if (arrOfTypes != undefined) {
		for (let elem of arrOfTypes) {
			for (let el of arr) {
				const type = el.id.split('_')[0];

				if (elem == type) {
					arrOfSortedByTypes.push(el);
				}
			}
		}
	}

	arrOfSortedByTypes.sort(function(a, b) {
		let x = a.time.replace(/\D+/g, '');
		let y = b.time.replace(/\D+/g, '');
		return x - y;
	});
	
	arrOfSortedByTypes.reduce((acc, el) => {
		acc[el.date] = (acc[el.date] || 0) + 1;

		if (acc[el.date] > 4) {
			arrOfIndexes.unshift(arrOfSortedByTypes.indexOf(el));
		}

		return acc;
	}, {}, null, 2);

	for (let index of arrOfIndexes) {
		arrOfSortedByTypes.splice(index, 1);
	}

	for (let obj of arrOfSortedByTypes) {
		const eventType = obj.id.split('_')[0];
		const fullDate = obj.id.split('_')[1];
		const month = fullDate.split('.')[1];
		const day = fullDate.split('.')[0];

		if (date.getMonth() == month) {
			document.querySelectorAll('.calendar_big .dateDay').forEach((item) => {
				if (item.innerHTML == day) {
					const sticker = createStickers(eventType, obj);

					item.previousElementSibling.appendChild(sticker);
				}
			});
		}
	}

	function createStickers(type, obj) {
		const smallSticker = document.createElement('div');
		let shortName = createShortName(obj.name);

		smallSticker.classList.add(`${type}_small_sticker`, 'small_sticker');
		smallSticker.setAttribute('data-name', shortName);
		smallSticker.setAttribute('data-time', obj.time);

		smallSticker.innerHTML = `${obj.time}`;

		return smallSticker;
	}
}

function createShortName(str) {
	let shortName = '';

	str.length > 22 ? shortName = `${str.substr(0, 19)}...` : shortName = str;

	return shortName;
}

export default checkLocalStorage;