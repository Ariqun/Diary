import React, {useState} from 'react';

import Sticker from './sticker';
import checkEvents from '../../../components/localStorage/checkEvents';
import deleteEvent from '../../../components/localStorage/deleteEvent';
import addZero from '../../../components/manipulationsWithNums/addZero';

const Graph = ({date, day, openModal}) => {
	const [reload, setReload] = useState(false);

	const time = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
	const events = checkEvents(date);
	let birthdayRow = null;

	const deleteSticker = (event) => {
		deleteEvent(event);
		setReload(true);
	}

	if (events) {
		birthdayRow = events.map(event => {
			const {eventType} = event;

			if (eventType !== 'birthday') return null;
	
			return(
				<div className="birthday_row" key={eventType}>
					<Sticker event={event} deleteSticker={deleteSticker} />
				</div>
			);
		})
	}

	const content = time.map(hour => {
		const modifyTime = `${addZero(hour)}:00`;
		let stickers = null;

		if (events) {
			stickers = events.map((event, i) => {
				if (parseInt(event.eventTime) !== hour || event.eventType === 'birthday') return null;
	
				return(
					<div key={i}>
						<Sticker event={event} deleteSticker={deleteSticker} />
					</div>
				)
			})
		}

		return(
			<tr onClick={(e) => openModal(e, hour)} key={hour}>
				<td><div className="time">{modifyTime}</div></td>
				<td><div className="inner_wrapper">{stickers}</div></td>
			</tr>
		)
	})

	return(
		<div className="graph">
			{birthdayRow}

			<table>
				<tbody>
					{content}
				</tbody>
			</table>

			<div className="date_day">{day}</div>
		</div>
	)
}

export default Graph;