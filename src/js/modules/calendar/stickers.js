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
				eventTime.classList.add('hidden');
				eventName.innerText = eventName.getAttribute('data-fullName');
	
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
				
				if (sticker.getBoundingClientRect().bottom > 885) {
					sticker.scrollIntoView({behavior: 'smooth',	block: 'end'});
				}

				sticker.closest('.sticker_wrapper').style.width = `${sticker.getBoundingClientRect().width + 25}px`;
			}

			function hide() {
				extend.classList.add('hidden');
				rules.classList.add('hidden');
				eventTime.classList.remove('hidden');
				eventName.innerText = eventName.getAttribute('data-shortName');
	
				sticker.style.cssText = '';
				sticker.closest('.sticker_wrapper').style.width = '';
			}

			sticker.addEventListener('mouseover', show);
			sticker.addEventListener('mouseout', hide);
		});
	}

	// editSticker() {
	// 	document.querySelectorAll('.sticker .sticker_edit').forEach((edit) => {
	// 		edit.addEventListener('click', () => {

	// 		});
	// 	});
	// }

	deleteSticker() {
		document.querySelectorAll('.sticker .sticker_delete').forEach((del) => {
			del.addEventListener('click', () => {
				const sticker = del.closest('.sticker');

				del.closest('.sticker_wrapper').remove();
				localStorage.removeItem(sticker.id);
			});
		});
	}

	init() {
		this.showAndHideExtendSticker();
		// this.editSticker();
		this.deleteSticker();
	}
}