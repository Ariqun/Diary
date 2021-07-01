import React, { useState } from 'react';
import {Route} from 'react-router-dom';

import Main from './pages/main';
import Day from './pages/day';
import './app.sass';
import Header from './components/header';

const App = () => {
	const [date, setDate] = useState(new Date());

	const changeMonth = (num) => {
		const newDate = new Date(date.getFullYear(), date.getMonth() + num);
		setDate(newDate);
	}

	return(
		<div className="app">
			<Header date={date} changeMonth={changeMonth} />

			<Route path="/" exact render={() => <Main date={date}/>} />

			<Route path="/day/:year/:month/:day" render={({match}) => {
				const {year, month, day} = match.params;
				return <Day year={year} month={month} day={day} date={date}/>
			}}/>
		</div>
	)
}

export default App;
