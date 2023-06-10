import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
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
  name: "student",
  initialState,
  reducers: {
    addNewStudent: (state, action: PayloadAction<StudentState>) => {
      state.studentList?.push(action.payload);
    },
    updateStudent: (state, action: PayloadAction<StudentState>) => {
      const {
        payload: { id, firstName, lastName, email, age,  grade },
      } = action;
      console.log(id, firstName, lastName)

      state.studentList = state.studentList.map((student) =>
      student.id === id ? { ...student, firstName, lastName, email, age,  grade } : student
      );
      console.log(state.studentList)
      localStorage.setItem("userData", JSON.stringify(state.studentList));
    },
    deleteStudent: (state, action: PayloadAction<{ id: string }>) => {
      const newArr = state.studentList.filter(
        (student) => student.id !== action.payload
      );
      localStorage.setItem("userData", JSON.stringify(newArr));
      state.studentList = newArr;
    },
  },
});

export const { addNewStudent, updateStudent, deleteStudent } = studentSlice.actions;

export const selectBookList = (state: RootState) => state.student.studentList;
export default studentSlice.reducer;