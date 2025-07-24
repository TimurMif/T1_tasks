import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState } from '../types/task';

const initialState: TasksState = {
  tasks: [],
  nextId: 2,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const newTask = {
        ...action.payload,
        id: state.nextId,
      };
      state.tasks.push(newTask);
      state.nextId += 1;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    }
  },
});

export const { createTask, deleteTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;