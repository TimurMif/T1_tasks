import React from 'react';

import TaskItem from './TaskItem';
import { useSelector } from 'react-redux';
import { RootState } from '../components/Store';

import '../style/taskList.css'
import '../style/App.css';

function TaskList() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  return (
    <div className='content-container'>
      <p className='priority-title'>Priority</p>
        <div className='info-container'>
          <div className='info-elem'>
            <span className='circle-priority high'></span>
            <p>High</p>
          </div>
          <div className='info-elem'>
            <div className='circle-priority medium'></div>
            <p>Medium</p>
          </div>
          <div className='info-elem'>
            <div className='circle-priority low'></div>
            <p>Low</p>
          </div>
        </div>
      <div className='create-place'>
        <a href="task/new" className='create-link'>Создать задачу</a>
      </div>
      <div className='tasks-list-container'>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
