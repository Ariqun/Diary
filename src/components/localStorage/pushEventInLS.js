import getDayAndMonth from "../manipulationsWithDate/getDayAndMonth";

const pushEventInLS = (event, eventDate) => {
	const dataBase = JSON.parse(localStorage.getItem('diary'));
	const {eventType} = event;
	let diary = {};

	if (eventType !== 'birthday') event.dateId = eventDate;
	else event.dateId = getDayAndMonth(eventDate);

	if (!dataBase) {
		if (eventType === 'birthday') diary['birthdays'] = [event];
		else diary[eventDate] = [event];
	}

	if (dataBase) {
		diary = dataBase;

		if (eventType === 'birthday') {
			if (diary['birthdays']) diary['birthdays'].push(event);
			else diary['birthdays'] = [event];
		} else {
			if (diary[eventDate]) diary[eventDate].push(event);
			else diary[eventDate] = [event];
		}
	}

	localStorage.setItem('diary', JSON.stringify(diary));
}

export default pushEventInLS;