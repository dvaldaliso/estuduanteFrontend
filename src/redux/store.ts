import { configureStore } from '@reduxjs/toolkit';
import { studentSlice } from '../features/student/studentSlice';

export const store = configureStore({
  reducer: {
    student: studentSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;