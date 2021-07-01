const deleteEvent = (event) => {
	let diary = JSON.parse(localStorage.getItem('diary'));
	if (!diary) return;

	const {dateId, eventTime, eventName} = event;

	const newDiary = diary[dateId].filter(e => eventTime !== e.eventTime && eventName !== e.eventName);

	diary[dateId] = newDiary;

	localStorage.setItem('diary', JSON.stringify(diary));
}

export default deleteEvent;