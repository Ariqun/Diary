import React from 'react';

const Tabs = ({tab, setTab}) => {
	const types = [{task: 'Задача'}, {reminder: 'Напоминание'}, {meeting: 'Встреча'}, {birthday: 'День рождения'}];

	const content = types.map(type => {
		const engName = Object.keys(type)[0];
		const rusName = type[engName];
		const className = tab === engName ? "event active" : "event"

		return(
			<div onClick={() => setTab(engName)} className={className} key={engName}>
				<span>{rusName}</span>
			</div>
		)
	})

	return <div className="event_types">{content}</div>
}

export default Tabs;