const matrix = (date) => {
	const amountOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	const dayOfWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	const arr = [];
	let count = 1;

	for (let i = 1; i <= 6; i++) {
		if (count > amountOfDays) break;

		const row = [];

		for (let j = 1; j <= 7; j++) {
			if (count > amountOfDays) {
				row.push('');
				continue;
			};

			if (i === 1 && (j < dayOfWeek || count > amountOfDays)) {
				row.push('');
			} else {
				row.push(count++);
			}
		}

		arr.push(row);
	}

	return arr;
}

export default matrix;