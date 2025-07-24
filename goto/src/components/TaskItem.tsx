import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {Dialog, DialogTitle, DialogActions, DialogContent} from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../components/Store';
import { updateTask } from '../components/taskSlice';
import { deleteTask } from '../components/taskSlice';

import { FormComponent} from "./Form";

import { Task } from "../types/task";
import '../style/taskItem.css';

const truncate = (str: string | undefined, maxLength: number): string => {
  if (str === undefined) return ""
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};

interface taskProps {
  props: Task;
}

const getStatusColor = (status: string): string => {
switch(status) {
  case 'Done':
    return "#6acc1a";
  case 'In Progress':
    return "yellow";
  case 'To Do':
    return "orange";
  default:
    return "black";
}
};

const getPriorityColor = (status: string): string => {
switch(status) {
  case 'High':
    return "red";
  case 'Medium':
    return "orange";
  case 'Low':
    return "lightblue";
  default:
    return "";
}
};

interface TaskItemProps {
  task: Task; // Меняем props на task
}

function TaskItem({ task }: TaskItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const statusBgColor = getStatusColor(task.status);
  const priorityBgColor = getPriorityColor(task.priority);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Task>({
    id: task.id,
    title: task.title,
    description: task.description,
    priority: task.priority,
    category: task.category,
    status: task.status,
    createdAt: task.createdAt
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleFormChange = (name: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('ru-RU', { month: 'short' });
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Форма отправлена:', formData);
    dispatch(updateTask(formData));
    setIsOpen(false);
  };

  function deleteTaskonClick() {
    dispatch(deleteTask(task.id));
  }

  return (
    <div className="task-card">
      <div className="content-wrapper">
        <div className="title-card-wrapper" onClick={() => navigate(`/task/${task.id}`)}>
            <div className="circle" style={{backgroundColor: priorityBgColor}}></div>
            <h2>{truncate(task.title, 45)}</h2>
            <p>{truncate(task.description, 28)}</p>
            <p className="date-place">{formatDate(task.createdAt)}</p>
        </div>
        <div className="info-card-wrapper">
            <div className="info-content">
              <p style={{backgroundColor: statusBgColor}}>{task.status}</p>
              <p className="title-category">{task.category}</p>
            </div>
            <div style={{width: 'auto', marginLeft: 'auto'}}>
              <IconButton color="primary"style={{width: "auto"}} onClick={handleOpen}>
                <EditSquareIcon sx={{color: '#1e96fc'}} fontSize="large"/>
              </IconButton>
              <IconButton color='error' style={{width: "auto"}} onClick={deleteTaskonClick}>
                <DeleteIcon sx={{color: '#ff0000ff'}} fontSize="large"/>
              </IconButton>
            </div>
        </div>
      </div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Редактирование</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <FormComponent 
              formData={formData} 
              onFormChange={handleFormChange} 
            />
            <DialogActions>
              <Button onClick={handleClose}>Отмена</Button>
              <Button type="submit" variant="contained" color="primary">
                Сохранить
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TaskItem;
