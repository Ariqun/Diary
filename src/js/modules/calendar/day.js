export default class Day {
	constructor(day) {
		this.day = day;
	}

	createDay() {
		const day = document.createElement('div');
			  day.classList.add('day');
		
		day.appendChild(this.day);
		document.querySelector('.diary').appendChild(day);
	}

	centeringNumberOfDay() {
		const width = document.querySelector('.dateDay').offsetWidth;
		const width1 = document.querySelector('.dateDay').clientWidth;
		const height = document.querySelector('.dateDay').offsetHeight;

		console.log(width, width1, height);
	}


	init() {
		this.createDay();
		this.centeringNumberOfDay();
	}
}