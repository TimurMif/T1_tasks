// src/components/taskSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../api/client';
import { Task, TasksState } from '../types/task';

const initialState: TasksState = {
  tasks: [],
  nextId: 1,
  loading: false,
  error: null
};

// Асинхронные операции
export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
  const response = await apiClient.get('/tasks');
  return response.data;
});

export const createTask = createAsyncThunk('tasks/create', async (task: Omit<Task, 'id'>) => {
  const response = await apiClient.post('/tasks', task);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/update', async (task: Task) => {
  const response = await apiClient.put(`/tasks/${task.id}`, task);
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id: number) => {
  await apiClient.delete(`/tasks/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Загрузка задач
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.nextId = Math.max(...action.payload.map((t: Task) => t.id), 0) + 1;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      
      // Создание задачи
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.nextId = action.payload.id + 1;
      })
      
      // Обновление задачи
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      
      // Удаление задачи
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  }
});

export default tasksSlice.reducer;