import React, { useState } from 'react';

import Options from './options';
import CalendarTable from '../../pages/main/components/calendarTable';
import './index.sass';

const LeftSide = ({date, mode, toggleVisible}) => {
	const [show, toggleShow] = useState(true);

	const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
	const currentMonth = months[date.getMonth()];

	const switchVisibleLeftSide = () => {
		if (show) toggleShow(false);
		else toggleShow(true);
	}

	return(
		<div className={show ? "left_side" : "left_side hide"}>
			<div className="wrapper_for_small_calendar">
				<div className="current_month">
					<div className="month">{currentMonth}</div>
				</div>

				<CalendarTable date={date} mini />
			</div>

			{mode === 'main' ? <Options toggleVisible={toggleVisible} /> : null}

			<div onClick={() => switchVisibleLeftSide()} className="switch">
				<img src={`${process.env.PUBLIC_URL}/assets/icons/toLeft.png`} alt="toLeft"/>
			</div>
		</div>
	)
}

export default LeftSide;