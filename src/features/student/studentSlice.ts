import { createSlice} from "@reduxjs/toolkit";
import { addStudent, deleteStudent, getStudents, updateStudent } from "../../services/student";

export const studentSlice = createSlice({
  name: "student",
  initialState: {
    list: {
        isLoading: false,
        status: "",
        values: []
    },
    save: {
        isSaving: false,
        isDeleting: false
    }
},
reducers: {
    clearSuccessMessage: (state, payload) => {
    }
},
extraReducers(builder) {
    builder
      .addCase(getStudents.pending, (state, action) => {
        state.list.status = "pending"
        state.list.isLoading = true
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.list.status = "success"
        state.list.values = action.payload
        state.list.isLoading = false
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.list.status = "failed"
        state.list.isLoading = false
      })
      .addCase(addStudent.pending, (state, action) => {
        state.list.status = "pending"
        state.save.isSaving = true
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.list.status = "success"
        state.save.isSaving = false
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.list.status = "failed"
        state.save.isSaving = false
      })
      .addCase(updateStudent.pending, (state, action) => {
        state.list.status = "pending"
        state.save.isSaving = true
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.list.status = "success"
        state.save.isSaving = false
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.list.status = "failed"
        state.save.isSaving = false
      })
      .addCase(deleteStudent.pending, (state, action) => {
        state.list.status = "pending"
        state.save.isDeleting = true
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.list.values = action.payload
        state.list.status = "success"
        state.save.isDeleting = false
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.list.status = "failed"
        state.save.isDeleting = false
      })
      
  }
});

export default studentSlice.reducer;