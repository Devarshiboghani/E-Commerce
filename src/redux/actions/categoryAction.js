import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get Categories
export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/category");

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Add Category
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/category", data);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/category/${id}`);

      console.log(res.data);

      return id;
    } catch (err) {
      console.log(err.response);
      return rejectWithValue(err.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `/api/category/${id}`,
        data
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);