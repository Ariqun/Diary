import React from 'react';

const Tabs = ({setTab}) => {
	const types = [{task: 'Задача'}, {reminder: 'Напоминание'}, {meeting: 'Встреча'}, {birthday: 'День рождения'}];

	const content = types.map(type => {
		const engName = Object.keys(type)[0];
		const rusName = type[engName];

		return(
			<div onClick={() => setTab(engName)} className="event" key={engName}>
				<span>{rusName}</span>
			</div>
		)
	})

	return <div className="event_types">{content}</div>
}

export default Tabs;