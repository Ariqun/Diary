import React from 'react';

import Options from './options';
import CalendarTable from '../../pages/main/components/calendarTable';
import './index.sass';

const LeftSide = ({date, mode, toggleVisible}) => {
	const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
	const currentMonth = months[date.getMonth()];

	return(
		<div className="left_side">
			<div className="wrapper_for_small_calendar">
				<div className="current_month">
					<div className="month">{currentMonth}</div>
				</div>

				<CalendarTable date={date} mini />
			</div>

			{mode === 'main' ? <Options toggleVisible={toggleVisible} /> : null}
		</div>
	)
}

export default LeftSide;