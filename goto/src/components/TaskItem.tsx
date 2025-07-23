import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {Dialog, DialogTitle, DialogActions, DialogContent} from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditSquareIcon from '@mui/icons-material/EditSquare';

import { FormComponent} from "./Form";

import { Task } from "../App";
import '../style/taskItem.css';

const truncate = (str: string | undefined, maxLength: number): string => {
  if (str === undefined) return ""
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};

interface taskProps {
  props: Task;
  changeTask: (updatedTask: Task) => void
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

function TaskItem({ props, changeTask }: taskProps) {

  const statusBgColor = getStatusColor(props.status);
  const priorityBgColor = getPriorityColor(props.priority);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Task>({
    id: props.id,
    title: props.title,
    description: props.description,
    priority: props.priority,
    category: props.category,
    status: props.status
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Форма отправлена:', formData);
    changeTask(formData)
    setIsOpen(false);
  };

  return (
    <div className="task-card">
      <div className="content-wrapper">
        <div className="title-card-wrapper" onClick={() => navigate(`/task/${props.id}`)}>
            <div className="circle" style={{backgroundColor: priorityBgColor}}></div>
            <h2>{truncate(props.title, 45)}</h2>
            <p>{truncate(props.description, 28)}</p>
        </div>
        <div className="info-card-wrapper">
            <div className="info-content">
              <p style={{backgroundColor: statusBgColor}}>{props.status}</p>
              <p className="title-category">{props.category}</p>
            </div>
            <IconButton color="primary"style={{width: "auto"}} onClick={handleOpen}>
              <EditSquareIcon sx={{color: '#1e96fc'}} fontSize="large"/>
            </IconButton>
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
