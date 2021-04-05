'use strict';

const checkLocalStorage = (mode, date, arrOfTypes) => {
	const obj = {...localStorage};
	let arr = [];

	if (mode == 'day') {
		for (let key in obj) {
			if (identification(obj[key])) {
				const eventType = key.split('_')[0];

				createStickersForDay(date, eventType, JSON.parse(obj[key]));
			}
		}
	} else if (mode == 'month') {
		for (let key in obj) {
			if (identification(obj[key])) {
				arr.push(JSON.parse(obj[key]));
			}
		}

		createStickersForMonth(date, arr, arrOfTypes);
	}

	function identification(item) {
		try {
			const substr = JSON.parse(item).id.split('_')[0];
		
			if (substr == 'task' || substr == 'reminder' || substr == 'meeting') {
				return true;
			} else {
				return false;
			}
		} catch {}
	}
};

function createStickersForDay(date, type, obj) {
	function pushEvent() {
		document.querySelectorAll('.time').forEach((time) => {
			const hourRow = time.innerHTML.substr(0, 2);
			const hourInDB = obj.time.substr(0, 2);
	
			if (date == obj.id.split('_')[1]) {
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
					<div class="name_and_time">
						<div class="event_name" data-shortName="${shortName}" data-fullName="${obj.name}">
							${shortName}
						</div>

						<div class="event_time">
							<span>[</span>${obj.time}<span>]</span>
						</div>
					</div>
					
					<div class="sticker_rules hidden">
						<div class="sticker_delete"><img src="assets/icons/sticker_delete.png"></div>
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
		let extendBLock = '';

		function createDateBlock() {
			const block = `
				<div class="date">
					<div class="icon icon_date"><img src="assets/icons/date.png"></div>
					<div class="sticker_extend_inner_wrapper">
						<div class="title">Когда:</div>
						<div class="value">${obj.date} ${obj.time}</div>
					</div>
				</div>
			`;
			return block;
		}

		function createDescrBlock() {
			const block = `
				<div class="descr">
					<div class="icon icon_descr"><img src="assets/icons/descr.png"></div>
					<div class="sticker_extend_inner_wrapper">
						<div class="title">Что:</div>
						<div class="value">${obj.descr}</div>
					</div>
				</div>
			`;
			return block;
		}

		function createPeopleAndLocationBlocks() {
			const block = `
				<div class="people">
					<div class="icon icon_people"><img src="assets/icons/people.png"></div>
					<div class="sticker_extend_inner_wrapper">
						<div class="title">Кто:</div>
						<div class="value">${obj.people.join(', ')}</div>
					</div>
				</div>
				<div class="location">
					<div class="icon icon_loc"><img src="assets/icons/location.png"></div>
					<div class="sticker_extend_inner_wrapper">
						<div class="title">Где:</div>
						<div class="value">${obj.location}</div>
					</div>
				</div>
			`;
			return block;
		}

		if (type == 'task') {
			extendBLock = `
				${createDateBlock()}
				${createDescrBlock()}
			`;
		} else if (type == 'meeting') {
			extendBLock = `
				${createDateBlock()}
				${createPeopleAndLocationBlocks()}
				${createDescrBlock()}
			`;
		} else if (type == 'reminder') {
			extendBLock = `
				${createDateBlock()}
			`;
		}
	
		return extendBLock;
	}

	pushEvent();
}

function createStickersForMonth(date, arr, arrOfTypes) {
	let arrOfIndexes = [];
	let sortedArr = [];

	function sortArrayBySelectedEventTypes() {
		if (arrOfTypes != undefined) {
			for (let elem of arrOfTypes) {
				for (let el of arr) {
					const type = el.id.split('_')[0];
	
					if (elem == type) {
						sortedArr.push(el);
					}
				}
			}
		}
	}
	
	function sortArrayByEventTime() {
		sortedArr.sort(function(a, b) {
			let x = a.time.replace(/\D+/g, '');
			let y = b.time.replace(/\D+/g, '');
			return x - y;
		});
	}

	function createArrayOfIndexesOfExcessItems() {
		let repeat = sortedArr.reduce((acc, el) => {
			acc[el.date] = (acc[el.date] || 0) + 1;
	
			if (acc[el.date] > 4) {
				arrOfIndexes.unshift(sortedArr.indexOf(el));
			}
	
			return acc;
		}, {}, null, 2);
	}

	function deleteExcessItemsFromArray() {
		for (let index of arrOfIndexes) {
			sortedArr.splice(index, 1);
		}
	}

	// for (let key in repeat) {
	// 	if (key.split('.')[0] == day & key.split('.')[1] == month) {
	// 		if (repeat[key] > 4) {
	// 			console.log(repeat[key] - 4);
	// 		}
	// 	}
	// }

	

	function createStickers() {
		for (let obj of sortedArr) {
			const eventType = obj.id.split('_')[0];
			const fullDate = obj.id.split('_')[1];
			const month = fullDate.split('.')[1];
			const day = fullDate.split('.')[0];

			if (date.getMonth() == month) {
				document.querySelectorAll('.calendar_big .dateDay').forEach((item) => {
					if (item.innerHTML == day) {
						const sticker = createStickerDOM(eventType, obj);

						item.previousElementSibling.appendChild(sticker);
					}
				});
			}
		}

		function createStickerDOM(type, obj) {
			const smallSticker = document.createElement('div');
			let shortName = createShortName(obj.name);
	
			smallSticker.classList.add(`${type}_small_sticker`, 'small_sticker');
			smallSticker.setAttribute('data-name', shortName);
			smallSticker.setAttribute('data-time', obj.time);
	
			smallSticker.innerHTML = `${obj.time}`;
	
			return smallSticker;
		}
	}

	sortArrayBySelectedEventTypes();
	sortArrayByEventTime();
	createArrayOfIndexesOfExcessItems();
	deleteExcessItemsFromArray();
	createStickers();
}

function createShortName(str) {
	let shortName = '';

	str.length > 22 ? shortName = `${str.substr(0, 19)}...` : shortName = str;

	return shortName;
}

export default checkLocalStorage;