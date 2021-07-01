import React, {useState} from 'react';

import Tabs from './tabs';
import Task from './task';
import Reminder from './reminder';
import Meeting from './meeting';
import Birthday from './birthday';
import modifyDate from '../../../../components/manipulationsWithDate/modifyDate';
import pushEventInLS from '../../../../components/localStorage/pushEventInLS';
import addZero from '../../../../components/manipulationsWithNums/addZero';

import './index.sass';

const Modal = ({date, hour, toggleModal}) => {
	const [tab, setTab] = useState('task');
	const [eventName, setEventName] = useState('');
	const [eventTime, setEventTime] = useState(`${addZero(hour)}:00`);
	const [taskDescr, setTaskDescr] = useState('');
	const [meetNames, setMeetNames] = useState([]);
	const [meetLoc, setMeetLoc] = useState('');
	const [meetDescr, setMeetDescr] = useState('');
	const [birthName, setBirthName] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [birthPresent, setBirthPresent] = useState('');

	const saveEvent = () => {
		const eventDate = modifyDate(date);
		let info = {
			eventType: tab, 
			eventDate: modifyDate(date, 'full'),
			eventName,
			eventTime
		};

		if (tab === 'task') info = {...info, taskDescr};
		if (tab === 'meeting') info = {...info, meetNames, meetLoc, meetDescr};
		if (tab === 'birthday') info = {...info, birthName, birthDate, birthPresent};

		pushEventInLS(info, eventDate);
		toggleModal(false);
	}
	
	const content = () => {
		if (tab === 'task') return <Task taskDescr={taskDescr} setTaskDescr={setTaskDescr} />
		if (tab === 'reminder') return <Reminder />
		if (tab === 'meeting') return <Meeting names={meetNames} setNames={setMeetNames} loc={meetLoc} setLoc={setMeetLoc} descr={meetDescr} setDescr={setMeetDescr} />
		if (tab === 'birthday') return <Birthday name={birthName} setName={setBirthName} date={birthDate} setDate={setBirthDate} present={birthPresent} setPresent={setBirthPresent} />
	}

	return(
		<div className="modal_wrapper">
			<form onSubmit={() => saveEvent()} className="modal">
				<div className="event_name">
					<input value={eventName} 
						   onChange={(e) => setEventName(e.target.value)} 
						   type="text" 
						   placeholder="Введите название" 
						   required
					/>
				</div>

				<Tabs setTab={setTab} />

				<div className="event_options">
					<div className="event_date_and_time">
						<div className="event_date">{modifyDate(date, 'full')}</div>
		
						<div className="event_time">
							<input value={eventTime} 
								   onChange={(e) => setEventTime(e.target.value)} 
								   type="time"
								   required
							/>
						</div>
					</div>

					<div className="event_preferences">{content()}</div>
				</div>

				<button className="event_save">Записать</button>

				<div onClick={() => toggleModal(false)} className="modal_close">&times;</div>
			</form>
		</div>
	)
}

export default Modal;