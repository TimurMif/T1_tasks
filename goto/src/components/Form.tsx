import React from 'react';
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box
} from '@mui/material';
import { Task } from '../types/task';
import { SelectChangeEvent } from '@mui/material/Select';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';

interface FormComponentProps {
  formData: Task;
  onFormChange: (name: string, value: string | number) => void;
}

export const FormComponent: React.FC<FormComponentProps> = ({ formData, onFormChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFormChange(name, value);
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    onFormChange(name, value);
  };

  const handleDateChange = (date: Date | null) => {
    const newDate = date || new Date(); 
    onFormChange('createdAt', newDate.toISOString()); 
  };

  const isValidDate = (date: any): boolean => {
    return date instanceof Date && !isNaN(date.getTime());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          label="Название"
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Описание"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Приоритет</InputLabel>
          <Select
            name="priority"
            value={formData.priority}
            label="Приоритет"
            onChange={handleSelectChange}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Middle</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Статус</InputLabel>
          <Select
            name="status"
            value={formData.status}
            label="Статус"
            onChange={handleSelectChange}
          >
            <MenuItem value="Done">Done</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="To Do">To Do</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Категория</InputLabel>
          <Select
            name="category"
            value={formData.category}
            label="Категория"
            onChange={handleSelectChange}
          >
            <MenuItem value="Bug">Bug</MenuItem>
            <MenuItem value="Feature">Feature</MenuItem>
            <MenuItem value="Documentation">Documentation</MenuItem>
            <MenuItem value="Refactor">Refactor</MenuItem>
            <MenuItem value="Test">Test</MenuItem>
          </Select>
        </FormControl>
        <DateTimePicker
          sx = {{width: {xs: '100%', sm: '50%'}}}
          label="Дата создания"
          value={isValidDate(new Date(formData.createdAt)) ? new Date(formData.createdAt) : new Date()}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: 'normal'
            }
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};
