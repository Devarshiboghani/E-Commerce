import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCart = createAsyncThunk("cart/getCart", async (userId, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/api/cart/${userId}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const addToCart = createAsyncThunk("cart/addToCart", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("/api/cart", data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const updateCartItem = createAsyncThunk("cart/updateCartItem", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.put("/api/cart", data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});