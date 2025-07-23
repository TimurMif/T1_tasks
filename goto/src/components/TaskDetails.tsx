import React, { useDebugValue, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {DialogActions, Box} from '@mui/material';
import Button from '@mui/material/Button';

import { Task } from '../App';
import { FormComponent } from './Form';
import '../style/form.css';

interface taskProps {
  props: Task[]
  onChangeTask: (updatedTask: Task) => void
}

const findTaskById = (tasks: Task[], id: number): Task | undefined => {
  return tasks.find(task => task.id === id);
};

function TaskDetails({props, onChangeTask}: taskProps) {
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>(); 

  const curTask = findTaskById(props, Number(id));
  
  const [formData, setFormData] = useState<Task>({
    id: Date.now(),
    title: "",
    description: "",
    priority: "Low",
    category: "Bug",
    status: "Done",
  });
  
  useEffect(() => {
    if(curTask) {
      setFormData({
        id: curTask.id,
        title: curTask.title,
        description: curTask.description,
        priority: curTask.priority,
        category: curTask.category,
        status: curTask.status
      })
    }
  }, [curTask]);

  if (curTask === undefined) {return(
    <div>
      <h1>Page not found</h1>
    </div>
  )};
  
  const handleFormChange = (name: string, value: string | number) => {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Форма отправлена:', formData);
      onChangeTask(formData)
      navigate('/');
    };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
            <FormComponent 
              formData={formData} 
              onFormChange={handleFormChange} 
            />
            <DialogActions>
              <Button type="submit" variant="contained" color="primary">
                Сохранить
              </Button>
            </DialogActions>
         </form>
    </div>
  );
}

export default TaskDetails;