import React, {useState} from 'react';

import limitationStr from '../../../components/manipulationsWithStr/limitationStr';

const Sticker = ({event, deleteSticker}) => {
	const [showExtend, toggleShowExtend] = useState(false);

	const {eventType, eventName, eventDate, eventTime} = event;
	const stickerEventName = showExtend ? eventName : limitationStr(eventName, 18);
	const stickerClassName = showExtend ? `sticker ${eventType}_sticker full` : `sticker ${eventType}_sticker`;
	const wrapperStyles = showExtend ? {minWidth: '370px'} : {};

	const toggleVisible = () => {
		if (showExtend) toggleShowExtend(false);
		else toggleShowExtend(true);
	}

	const createBlock = (block) => {
		const {type, title, value} = block;

		return(
			<div className={type} key={`${type}_${value}`}>
				<div className="icon">
					<img src={`${process.env.PUBLIC_URL}/assets/icons/${type}.png`} alt={type} />
				</div>
				<div className="sticker_extend_inner_wrapper">
					<div className="title">{title}</div>
					<div className="value">{value}</div>
				</div>
			</div>
		)
	}

	const createStickerBody = () => {
		if (eventType === 'task') {
			const blocks = [{type: 'descr',	title: 'Что:', value: event.taskDescr}];
			
			return blocks.map(block => createBlock(block));
		}

		if (eventType === 'meeting') {
			const blocks = [
				{type: 'people', title: 'Кто:', value: event.meetNames},
				{type: 'location', title: 'Где:', value: event.meetLoc},
				{type: 'descr', title: 'Что:', value: event.meetDescr}
			];

			return blocks.map(block => createBlock(block));
		}

		if (eventType === 'birthday') {
			const birthdayYear = parseInt(event.birthDate);
			const now = new Date();
			const age = now.getFullYear() - birthdayYear;

			const blocks = [
				{type: 'person', title: 'Кто:', value: event.birthName},
				{type: 'birthday', title: 'Дата рождения:', value: event.birthDate},
				{type: 'age', title: 'Возраст:', value: age},
				{type: 'present', title: 'Подарок:', value: event.birthPresent}
			];

			return blocks.map(block => createBlock(block));
		}
	}

	const rulesBlock = () => {
		if (!showExtend) return null; 

		return(
			<div onClick={() => deleteSticker(event)} className="sticker_rules">
				<img className="sticker_delete" src={`${process.env.PUBLIC_URL}/assets/icons/delete.png`} alt="delete" />
			</div>
		)
	}

	return(
		<div className="sticker_wrapper" style={wrapperStyles}>
			<div onMouseEnter={toggleVisible} onMouseLeave={toggleVisible} className={stickerClassName}>
				<div className="event_header">
					<div className="name_and_time">
						<div className="event_name">{stickerEventName}</div>
						<div className="event_time"><span>[</span>{eventTime}<span>]</span></div>
					</div>

					{rulesBlock()}
				</div>

			
				<div className={showExtend ? "sticker_extend" : "sticker_extend hidden"}>
					{createBlock({type: 'date', title: 'Когда:', value: `${eventDate} ${eventTime}`})}
					{createStickerBody()}
				</div>
			</div>
		</div>
	)
}

export default Sticker;