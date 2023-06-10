import { configureStore } from '@reduxjs/toolkit';
import { studentSlice } from '../features/student/studentSlice';
import { userSlice } from '../features/user/userSlice';
import { useDispatch } from "react-redux";
export const store = configureStore({
  reducer: {
    student: studentSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()