import React from 'react';
import {Link} from 'react-router-dom';

import './index.sass';

const Header = ({date, changeMonth}) => {
	const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
	const currentMonth = months[date.getMonth()];
	const currentYear = date.getFullYear();

	return(
		<div className="header">
			<div className="title">
				<Link to={`/`}>
					Ежедневник
				</Link>
			</div>

			<div className="current_month">
				<div className="month">{currentMonth} {currentYear}</div>

				<div onClick={() => changeMonth(-1)} className="change_month">
					<img src={`${process.env.PUBLIC_URL}/assets/icons/arrow-left.png`} alt='arrow_left'/>
				</div>
				
				<div onClick={() => changeMonth(+1)} className="change_month">
					<img src={`${process.env.PUBLIC_URL}/assets/icons/arrow-right.png`} alt='arrow_right'/>
				</div>
			</div>
		</div>
	)
}

export default Header;