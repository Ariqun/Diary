const modifyDate = (date, mode) => {
	const arrOfMonths = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
	const arrOfDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
	const year = date.getFullYear();
	const month = date.getMonth();
	const dayOfWeek = date.getDay();
	const day = date.getDate();

	if (mode === 'full') return `${arrOfDays[dayOfWeek - 1]}, ${day} ${arrOfMonths[month]} ${year}`;
	if (!mode) return `${day}.${month}.${year}`; 
}

export default modifyDate;