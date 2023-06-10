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
extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.list.status = "pending"
        state.list.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.list.status = "success"
        state.list.values = action.payload
        state.list.isLoading = false
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.list.status = "failed"
        state.list.isLoading = false
      })
  }

});

export default userSlice.reducer;