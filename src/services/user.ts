import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./api";

export const getUsers = createAsyncThunk("user/getUsers", async () => {
    try {
        const response = await API.get("posts")
        return response.data
    } catch (error) {
        console.log(error)
    }
})
