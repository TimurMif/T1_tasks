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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
    
      const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsSubmitting(true);
          setError(null);
          
          try {
              await dispatch(createTask({
                  ...formData,
                  createdAt: new Date().toISOString()
              })).unwrap();
              
              navigate('/');
          } catch (err) {
              setError('Ошибка при создании задачи');
              console.error('Create task error:', err);
          } finally {
              setIsSubmitting(false);
          }
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