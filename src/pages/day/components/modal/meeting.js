import React from 'react';

const Meeting = ({names, setNames, loc, setLoc, descr, setDescr}) => {
	return(
		<div className="event_meeting">
			<div className="meeting_people">
				<input value={names} 
					   onChange={(e) => setNames(e.target.value)} 
					   type="text" 
					   placeholder="Укажите имена через запятую"
					   required
				/>
			</div>

			<div className="meeting_location">
				<input value={loc} 
					   onChange={(e) => setLoc(e.target.value)} 
					   type="text" 
					   placeholder="Укажите место встречи"
					   required
				/>
				<div className="suggestions"></div>
			</div>

			<div className="meeting_descr">
				<input value={descr} 
					   onChange={(e) => setDescr(e.target.value)} 
					   type="text" 
					   placeholder="Добавьте описание"
					   required
				/>
			</div>
		</div>
	)
}

export default Meeting;