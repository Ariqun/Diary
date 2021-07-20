import getDayAndMonth from "../manipulationsWithDate/getDayAndMonth";
import modifyDate from "../manipulationsWithDate/modifyDate";

const checkEvents = (date) => {
	const modedDate = modifyDate(date);
	const diary = JSON.parse(localStorage.getItem('diary'));
	
	if (!diary) return null;

	if (!diary[modedDate]) {
		const birthdays = checkBirthdays(diary, modedDate);

		if (!birthdays) return null;
		else return diary[modedDate] = birthdays;
	}

	const birthdays = checkBirthdays(diary, modedDate);
	diary[modedDate].push(...birthdays);

	return diary[modedDate];
}

const checkBirthdays = (diary, date) => {
	const dayAndMonth = getDayAndMonth(date);

	if (!diary['birthdays']) return [];

	const birthdays = diary['birthdays'].filter(birthday => birthday.dateId === dayAndMonth);

	return birthdays;
}

export default checkEvents;