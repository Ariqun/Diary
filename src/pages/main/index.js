import React, {useState} from 'react';

import CalendarTable from './components/calendarTable';
import LeftSide from '../../components/leftSide';
import './index.sass';

const Main = ({date}) => {
	const [showTasks, toggleShowTasks] = useState(true);
	const [showReminders, toggleShowReminders] = useState(true);
	const [showMeetings, toggleShowMeetings] = useState(true);
	const [showBirthdays, toggleShowBirthdays] = useState(true);

	const toggleVisible = (item) => {
		if (item === 'tasks') {
			if (showTasks) toggleShowTasks(false);
			else toggleShowTasks(true);
		}
		if (item === 'reminders') {
			if (showReminders) toggleShowReminders(false);
			else toggleShowReminders(true);
		}
		if (item === 'meetings') {
			if (showMeetings) toggleShowMeetings(false);
			else toggleShowMeetings(true);
		}
		if (item === 'birthdays') {
			if (showBirthdays) toggleShowBirthdays(false);
			else toggleShowBirthdays(true);
		}
	}

	return(
		<div className="main_page">
			<LeftSide date={date} mode="main" toggleVisible={toggleVisible} />
			<CalendarTable date={date} showTasks={showTasks} showReminders={showReminders} showMeetings={showMeetings} showBirthdays={showBirthdays} />
		</div>
	)
}

export default Main;