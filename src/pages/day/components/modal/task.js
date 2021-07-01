import React from 'react';

const Task = ({taskDescr, setTaskDescr}) => {
	return(
		<div className="event_task">
			<div className="task_descr">
				<textarea value={taskDescr} 
						  onChange={(e) => setTaskDescr(e.target.value)} 
						  placeholder="Описание задачи" 
						  required
				/>
			</div>
		</div>
	)
}

export default Task;