import { createSlice} from "@reduxjs/toolkit";
import { getUsers } from "../../services/user";

export const userSlice = createSlice({
  name: "user",
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
    [getUsers.pending.type]: (state, action) => {
        state.list.status = "pending"
        state.list.isLoading = true
    },
    [getUsers.fulfilled.type]: (state, { payload }) => {
        state.list.status = "success"
        state.list.values = payload
        state.list.isLoading = false
    },
    [getUsers.rejected.type]: (state, action) => {
        state.list.status = "failed"
        state.list.isLoading = false
    },
    
}

});

export default userSlice.reducer;