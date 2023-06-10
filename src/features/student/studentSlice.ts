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
        // TODO: Update state to clear success message
    }
},
extraReducers: {
    [getStudents.pending.type]: (state, action) => {
        state.list.status = "pending"
        state.list.isLoading = true
    },
    [getStudents.fulfilled.type]: (state, { payload }) => {
        state.list.status = "success"
        state.list.values = payload
        state.list.isLoading = false
    },
    [getStudents.rejected.type]: (state, action) => {
        state.list.status = "failed"
        state.list.isLoading = false
    },
    [addStudent.pending.type]: (state, action) => {
        state.save.isSaving = true
    },
    [addStudent.fulfilled.type]: (state, action) => {
        state.save.isSaving = false
    },
    [addStudent.rejected.type]: (state, action) => {
        state.save.isSaving = false
    },
    [updateStudent.pending.type]: (state, action) => {
        state.save.isSaving = true
    },
    [updateStudent.fulfilled.type]: (state, action) => {
        state.save.isSaving = false
    },
    [updateStudent.rejected.type]: (state, action) => {
        state.save.isSaving = false
    },
    [deleteStudent.pending.type]: (state, action) => {
        state.save.isDeleting = true
    },
    [deleteStudent.fulfilled.type]: (state, action) => {
        state.save.isDeleting = false
    },
    [deleteStudent.rejected.type]: (state, action) => {
        state.save.isDeleting = false
    }
}

});

export default studentSlice.reducer;