import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./api";
import { IStudent } from "../model/stundent";

export const getEmployees = createAsyncThunk("student/getStudents", async () => {
    try {
        const response = await API.get("student")
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const addEmployee = createAsyncThunk("student/addStudent", async (student: IStudent) => {
    try {
        const response = await API.post("student", student)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateEmployee = createAsyncThunk("student/updateStudent",
    async (student: IStudent) => {
        try {
            const response = await API.put(`student/${student.employeeId}`, student);
            return response.data
        } catch (error) {
            console.log(error)
        }
    }) 

export const deleteEmployee = createAsyncThunk("student/deleteStudent", async (studentId: number) => {
    try {
        const response = await API.delete(`student/${studentId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})