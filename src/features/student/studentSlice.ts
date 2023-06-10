import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { StudentState } from "../../redux/types";

type initialStateType = {
  studentList: StudentState[];
};
const studentList: StudentState[] =
  JSON.parse(localStorage.getItem("userData") as string) ?? [];

const initialState: initialStateType = {
  studentList,
};

export const studentSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addNewStudent: (state, action: PayloadAction<StudentState>) => {
      state.studentList?.push(action.payload);
    },
    updateStudent: (state, action: PayloadAction<StudentState>) => {
      const {
        payload: { id, firstName, lastName, email, age,  grade },
      } = action;

      state.studentList = state.studentList.map((student) =>
      student.id === id ? { ...student,firstName, lastName, email, age,  grade } : student
      );
      localStorage.setItem("userData", JSON.stringify(state.studentList));
    },
    deleteStudent: (state, action: PayloadAction<{ id: string }>) => {
      const newArr = state.studentList.filter(
        (book) => book.id !== action.payload
      );
      localStorage.setItem("userData", JSON.stringify(newArr));
      state.studentList = newArr;
    },
  },
});

export const { addNewStudent, updateStudent, deleteStudent } = studentSlice.actions;

export const selectBookList = (state: RootState) => state.student.studentList;
export default studentSlice.reducer;