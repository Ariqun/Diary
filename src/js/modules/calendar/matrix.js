export default class Matrix {
	constructor(date) {
		this.date = date;
	}

	createCalendarMatrix() {
		const amountOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
		const dayOfWeek = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
		const arr = [];
		let count = 1;

		for (let i = 1; i <= 6; i++) {
			const row = [];

			for (let j = 1; j <= 7; j++) {
				if (i == 1 && j < dayOfWeek || count > amountOfDays) {
					row.push('');
				} else {
					row.push(count++);
				}
			}

			arr.push(row);
		}

		function removeEmptySubArrs() {
			let x = 0;

			for (let subArr of arr) {
				let counter = 0;

				for (let elem of subArr) {
					elem == '' ? counter++ : null;
	
					counter == 7 ? x++ : null;
				}
			}
	
			for (let i = 0; i < x; i++) {
				arr.pop();
			}
		}
		removeEmptySubArrs();
		
		return arr;
	}

	init() {
		return this.createCalendarMatrix();
	}
}