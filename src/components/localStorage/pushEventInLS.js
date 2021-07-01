const pushEventInLS = (info, eventDate) => {
	const dataBase = JSON.parse(localStorage.getItem('diary'));
	let diary = {};

	info.dateId = eventDate;

	if (!dataBase) {
		diary = {
			[eventDate]: [info]
		}
	}

	if (dataBase) {
		if (!dataBase[eventDate]) {
			diary = {
				...dataBase,
				[eventDate]: [info]
			}
		}

		if (dataBase[eventDate] && dataBase[eventDate]) {
			diary = {
				...dataBase,
				[eventDate]: [...dataBase[eventDate], info]
			}
		}
	}

	localStorage.setItem('diary', JSON.stringify(diary));
}

export default pushEventInLS;