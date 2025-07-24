import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {DialogActions} from '@mui/material';
import Button from '@mui/material/Button';

import { Task } from '@/types/task';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../components/Store';
import { updateTask } from '../components/taskSlice';

import { FormComponent } from './Form';
import '../style/form.css';

export default function TaskDetails() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const curTask = tasks.find(task => task.id === Number(id));
  
  const [formData, setFormData] = useState<Task>({
    id: Date.now(),
    title: "",
    description: "",
    priority: "Low",
    category: "Bug",
    status: "To Do",
    createdAt: Date.now().toString()
  });

  useEffect(() => {
    if (curTask) {
      setFormData(curTask);
    }
  }, [curTask]);

  if (!curTask) {
    return <div><h1>Page not found</h1></div>;
  }

  const handleFormChange = (name: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateTask(formData));
    navigate('/');
  };

  const cancelClick = () => {
        navigate('/');
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <FormComponent 
          formData={formData} 
          onFormChange={handleFormChange} 
        />
        <DialogActions>
          <Button onClick={cancelClick} type="button" variant="outlined" color="secondary">
            Отмена
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}