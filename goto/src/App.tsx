import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './style/App.css';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';

import logo from './assets/images/logo.png';

export type Task = {
  id: number,
  title: string,
  description?: string,
  status: 'Done' | 'In Progress' | 'To Do',
  priority: 'Low' | 'Medium' | 'High',
  category: 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test',
}

function App() {
  const [tasks, setTasks] = useState<Task []>([
    {
      id: 1,
      title: 'Посмотреть лекцию',
      status: 'In Progress',
      priority: 'Medium',
      category: 'Feature'
    },
    {
      id: 2,
      title: 'Затестировать фичу на моем новом приложении',
      status: 'To Do',
      priority: 'High',
      category: 'Test'
    },
    {
      id: 3,
      title: 'Доделать модальное окно',
      description: 'Добавить иконки на кнопки из Material UI',
      status: 'In Progress',
      priority: 'Medium',
      category: 'Feature'
    },
    {
      id: 4,
      title: 'Поискать картинки-заглушки для макета',
      status: 'Done',
      priority: 'Low',
      category: 'Feature'
    },
    {
      id: 5,
      title: 'Изучить, как работать с Material UI',
      description: 'Есть пара сайтов на которых очень удобно все разьяснено',
      status: 'To Do',
      priority: 'Medium',
      category: 'Feature'
    },
    {
      id: 6,
      title: 'Подумать над обновлением приложения',
      status: 'In Progress',
      priority: 'Low',
      category: 'Feature'
    },
    {
      id: 7,
      title: 'Скинуть другу сборку приложения',
      status: 'To Do',
      priority: 'Low',
      category: 'Test'
    },
  ]);

  const handleTaskChange = (updatedTask: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  return (
    <div className="App">
      <header>
        <img src={logo} alt="" />
      </header>
      <section className='content-container'>
        <Routes>
          <Route path='/' element={<TaskList props={tasks} onChangeTask={handleTaskChange}></TaskList>}></Route>
          <Route path='/task/:id' element={<TaskDetails props={tasks} onChangeTask={handleTaskChange}></TaskDetails>}></Route>
        </Routes>
      </section>
      <footer>
        <p>&copy; 2025 TM All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
