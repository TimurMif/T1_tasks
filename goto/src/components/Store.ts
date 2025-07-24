import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../components/taskSlice';
import { loadState, saveState } from './storage';

export interface RootState {
  tasks: ReturnType<typeof tasksReducer>;
}

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: persistedState as RootState, 
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
