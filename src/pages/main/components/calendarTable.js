import React, { useState } from 'react';
import {Link} from 'react-router-dom';

import matrix from './matrix';
import checkEvents from '../../../components/localStorage/checkEvents';
import limitationStr from '../../../components/manipulationsWithStr/limitationStr';

const CalendarTable = ({date, mini = false, showTasks, showReminders, showMeetings, showBirthdays}) => {
	const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
	const shortDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
	const monthMatrix = matrix(date);
	const year = date.getFullYear();
	const month = date.getMonth();

	const head = () => {
		const arr = mini ? shortDays : days;

		return arr.map(day => <th key={day}>{day}</th>);
	}

	const createSmallSticker = (event) => {
		const {eventType, eventTime, eventName} = event;
		const shortName = limitationStr(eventName, 12);

		if (eventType === 'task' && !showTasks) return null;
		if (eventType === 'reminder' && !showReminders) return null;
		if (eventType === 'meeting' && !showMeetings) return null;
		if (eventType === 'birthday' && !showBirthdays) return null;

		return(
			<div className={`small_sticker ${eventType}`} key={`${eventType}_${eventName}`}>
				<div className="hidden event_name">{shortName}</div>
				<div className="event_time">
					<span className="hidden bracket">[</span>
					{eventTime}
					<span className="hidden bracket">]</span>
				</div>
			</div>
		)
	}
	
	const content = monthMatrix.map(week => {
		const row = week.map((day, i) => {
			const now = new Date();
			const events = checkEvents(new Date(year, month, day));
			let className = 'date_day';
			let stickers = null;
			
			if (events && !mini) stickers = events.map(event => createSmallSticker(event));

			if (day === now.getDate() && date.getFullYear() === now.getUTCFullYear() && date.getMonth() === now.getMonth()) className += ' today';
			if (i === week.length - 1 || i === week.length - 2) className += ' weekend';

			return(
				<td key={day + i}>
					<div className="item" >
						<Link to={`/day/${year}/${month}/${day}`}>
							<div className="stickers">{stickers}</div>
							<div className={className}>{day}</div>
						</Link>
					</div>
				</td>
			)
		})

		return <tr key={week}>{row}</tr>;
	})
	
	return(
		<div className={mini ? 'calendar_mini' : 'calendar'}>
			<table>
				<thead>
					<tr>{head()}</tr>
				</thead>
				<tbody>
					{content}
				</tbody>
			</table>
		</div>
	)
}

export default CalendarTable;