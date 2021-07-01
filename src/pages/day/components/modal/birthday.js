import React from 'react';

const Birthday = ({name, setName, date, setDate, present, setPresent}) => {
	return(
		<div className="event_birthday">
			<div className="birthday_person">
				<input value={name} 
					   onChange={(e) => setName(e.target.value)} 
					   type="text" 
					   placeholder="Укажите имя именинника или именинницы"
					   required
				/>
			</div>

			<div className="birthday_date">
				<label>Укажите дату рождения: 
					<input type="date" 
						   value={date} 
					       onChange={(e) => setDate(e.target.value)}
						   required
					/>
				</label>
			</div>

			<div className="birthday_present">
				<input value={present} 
					   onChange={(e) => setPresent(e.target.value)} 
					   type="text" 
					   placeholder="Уже выбрали подарок?"
					   required
				/>
			</div>
		</div>
	)
}

export default Birthday;