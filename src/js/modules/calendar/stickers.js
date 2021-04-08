export default class Stickers {
	constructor() {

	}

	showAndHideExtendSticker() {
		document.querySelectorAll('.day .sticker').forEach((sticker) => {
			const extend = sticker.querySelector('.sticker_extend');
			const rules = sticker.querySelector('.sticker_rules');
			const eventName = sticker.querySelector('.event_name');
			const eventTime = sticker.querySelector('.event_time');
	
			function show() {
				extend.classList.remove('hidden');
				rules.classList.remove('hidden');
				eventName.innerText = eventName.getAttribute('data-fullName');
	
				if (sticker.classList.contains('birthday_sticker')) {
					sticker.style.cssText = `
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						font-size: 18px;
						border: 1px solid rgba(0, 0, 0, 0.5);
						box-shadow: 0px 2px 10px 0px black;
						background: white;
						z-index: 1;
					`;
				} else {
					sticker.style.cssText = `
						position: absolute;
						min-width: 300px;
						min-height: 80px;
						height: auto;
						font-size: 18px;
						border: 1px solid rgba(0, 0, 0, 0.5);
						box-shadow: 0px 2px 10px 0px black;
						background: white;
						z-index: 1;
					`;

					eventTime.classList.add('hidden');

					if (sticker.getBoundingClientRect().bottom > 885) {
						sticker.scrollIntoView({behavior: 'smooth',	block: 'end'});
					}
	
					sticker.closest('.sticker_wrapper').style.width = `${sticker.getBoundingClientRect().width + 25}px`;
				}
			}

			function hide() {
				extend.classList.add('hidden');
				rules.classList.add('hidden');
				eventName.innerText = eventName.getAttribute('data-shortName');
	
				sticker.style.cssText = '';

				if (!sticker.classList.contains('birthday_sticker')) {
					eventTime.classList.remove('hidden');
					sticker.closest('.sticker_wrapper').style.width = '';
				}
			}

			sticker.addEventListener('mouseover', show);
			sticker.addEventListener('mouseout', hide);
		});
	}

	editPresent() {
		document.querySelectorAll('.sticker .present').forEach((item) => {
			const addInputForEdit = () => {
				const div = document.createElement('div');
				div.classList.add('sticker_edit');

				div.innerHTML = `
					<input class="def_input" type="text">
					<button class="save_changes">Сохранить</button>
				`;

				item.querySelector('.sticker_extend_inner_wrapper').classList.add('hidden');
				item.appendChild(div);
				item.querySelector('input').focus();

				saveChanges();
				item.removeEventListener('click', addInputForEdit);
			};

			const saveChanges = () => {
				const btn = document.querySelector('.save_changes');

				btn.addEventListener('click', () => {
					const id = btn.closest('.sticker').id;
					const changedStr = btn.closest('.sticker_edit').querySelector('.def_input').value;

					const itemFromBD = JSON.parse(localStorage.getItem(id));
					const obj = {
						birthDate: itemFromBD.birthDate,
						date: itemFromBD.date,
						id: itemFromBD.id,
						name: itemFromBD.name,
						person: itemFromBD.person,
						time: itemFromBD.time,
						present: changedStr
					};

					localStorage.setItem(id, JSON.stringify(obj));

					item.querySelector('.sticker_extend_inner_wrapper').classList.remove('hidden');
					item.querySelector('.value').innerHTML = changedStr;
					btn.closest('.sticker_edit').remove();
				});
			};

			item.addEventListener('click', addInputForEdit);
		});
	}

	deleteSticker() {
		document.querySelectorAll('.sticker .sticker_delete').forEach((del) => {
			del.addEventListener('click', () => {
				const sticker = del.closest('.sticker');
				
				if (del.closest('.birthday_row')) {
					del.closest('.birthday_row').remove();
				} else {
					del.closest('.sticker_wrapper').remove();
				}
				localStorage.removeItem(sticker.id);
			});
		});
	}

	init() {
		this.showAndHideExtendSticker();
		this.editPresent();
		this.deleteSticker();
	}
}