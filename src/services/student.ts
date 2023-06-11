import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./api";
import { IStudent } from "../model/stundent";

export const getStudents = createAsyncThunk("student/getStudents", async () => {
    try {
        const response = await API.get("estudiante")
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const addStudent = createAsyncThunk("student/addStudent", async (student: IStudent) => {
    try {
        const response = await API.post("estudiante", student)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateStudent = createAsyncThunk("student/updateStudent",
    async (student: IStudent) => {
        try {
            const response = await API.patch(`estudiante/${student.id}`, student);
            return response.data
        } catch (error) {
            console.log(error)
        }
    }) 

export const deleteStudent = createAsyncThunk("student/deleteStudent", async (studentId: number) => {
    try {
        const response = await API.delete(`estudiante/${studentId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})