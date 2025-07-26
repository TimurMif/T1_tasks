import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './style/App.css';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import TaskCreate from './components/TaskCreate';

import logo from './assets/images/logo.png';

function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} alt="" />
      </header>
      <section className='content-container'>
        <Routes>
          <Route path='/' element={<TaskList></TaskList>}></Route>
          <Route path='/task/:id' element={<TaskDetails></TaskDetails>}></Route>
          <Route path='/task/new' element={<TaskCreate></TaskCreate>}></Route>
        </Routes>
      </section>
      <footer>
        <p>&copy; 2025 TM All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
