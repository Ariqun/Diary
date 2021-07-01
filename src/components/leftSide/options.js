import React from 'react';

const Options = ({toggleVisible}) => {
	const opts = [
		{tasks: 'Задачи'}, 
		{reminders: 'Напоминания'},
		{meetings: 'Встречи'},
		{birthdays: 'Дни рождения'}
	];

	const content = opts.map(opt => {
		const engName = Object.keys(opt)[0];
		const rusName = opt[engName];

		return(
			<div className="option" key={engName}>
				<input onChange={() => {toggleVisible(engName)}} 
					   id={`display_${engName}`} 
					   type="checkbox" 
					   defaultChecked 
				/>
				<label id={engName} htmlFor={`display_${engName}`} />
				<div className="option__icon" />
				<label htmlFor={`display_${engName}`}>{rusName}</label>
			</div>
		)
	})

	return(
		<div className="options">
			{content}
		</div>
	)
}

export default Options;