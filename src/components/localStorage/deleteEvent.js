const deleteEvent = (event) => {
	let diary = JSON.parse(localStorage.getItem('diary'));
	if (!diary) return;

	const {eventType, dateId, eventName, birthDate, birthName} = event;
	let newDiary;

	if (eventType === 'birthday') {
		newDiary = diary['birthdays'].filter(e => birthDate !== e.birthDate && birthName !== e.birthName);
		diary['birthdays'] = newDiary;
	} else {
		newDiary = diary[dateId].filter(e => eventName !== e.eventName);
		diary[dateId] = newDiary;
	}

	localStorage.setItem('diary', JSON.stringify(diary));
}

export default deleteEvent;