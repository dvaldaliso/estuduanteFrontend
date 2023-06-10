import { configureStore } from '@reduxjs/toolkit';
import { bookSlice } from '../features/student/studentSlice';

export const store = configureStore({
  reducer: {
    book: bookSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;