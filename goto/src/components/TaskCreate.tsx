import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {DialogActions, Box} from '@mui/material';
import Button from '@mui/material/Button';

import { Task } from '@/types/task';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../components/Store';
import { createTask } from './taskSlice';

import { FormComponent } from './Form';
import '../style/form.css';

export default function TaskCreate() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState<Task>({
        id: Date.now(),
        title: "",
        description: "",
        priority: "Low",
        category: "Bug",
        status: "To Do",
        createdAt: new Date().toISOString()
      });
    
      const handleFormChange = (name: string, value: string | number) => {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createTask(formData));
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
                Создать
            </Button>
            </DialogActions>
        </form>
    </div>
    )
}