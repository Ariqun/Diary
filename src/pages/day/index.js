import React, { useState } from 'react';

import Graph from './components/graph';
import Modal from './components/modal';
import LeftSide from '../../components/leftSide';
import './index.sass';

const Day = ({date, year, month, day}) => {
	const [showModal, toggleModal] = useState(false);
	const [hour, setHour] = useState(0);

	const currentDay = new Date(year, month, day);

	const openModal = (e, hour) => {
		if (e.target.className !== 'inner_wrapper') return;

		setHour(hour);
		toggleModal(true);
	}
	const modal = showModal ? <Modal date={currentDay} toggleModal={toggleModal} hour={hour} /> : null;

	return(
		<div className="day_page">
			<LeftSide date={date} />
			<Graph date={currentDay} day={day} openModal={openModal} />
			{modal}
		</div>
	)
}

export default Day;