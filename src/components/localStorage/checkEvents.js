import modifyDate from "../manipulationsWithDate/modifyDate";

const checkEvents = (date) => {
	const modedDate = modifyDate(date);
	const diary = JSON.parse(localStorage.getItem('diary'));
	
	if (!diary || !diary[modedDate]) return null;

	return diary[modedDate];
}

export default checkEvents;