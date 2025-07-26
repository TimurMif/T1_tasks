import React from 'react';

import TaskItem from './TaskItem';
import { RootState } from '../components/Store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './taskSlice';
import { AppDispatch } from '../components/Store'; 

import '../style/taskList.css'
import '../style/App.css';

function TaskList() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
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
