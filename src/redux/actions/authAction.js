import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signUp = createAsyncThunk('auth/signUp', async(data, {rejectWithValue}) => {
    try {
        let res = await axios.post('/api/auth/register', data);
        return res.data.user
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
})

export const signIn = createAsyncThunk('auth/signIn', async(data, {rejectWithValue}) => {
    try {
        let res = await axios.post('/api/auth/login', data);
        return res.data.user
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
})