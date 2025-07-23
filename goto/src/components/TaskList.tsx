import React from 'react';

import { Task } from '../App';
import '../style/App.css';
import TaskItem from './TaskItem';
import '../style/taskList.css'

interface taskProps {
  props: Task[]
  onChangeTask: (updatedTask: Task) => void
}

function TaskList({props, onChangeTask}: taskProps) {
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
      <div className='tasks-list-container'>
        {props.map(task => (
          <TaskItem props={task} changeTask={onChangeTask}></TaskItem>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
