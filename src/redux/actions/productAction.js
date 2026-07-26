import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ======================
// Add Product
// ======================

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/products", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ======================
// Get All Products
// ======================

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/products");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ======================
// Get Single Product
// ======================

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/products/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/product/${id}`);

      console.log(res.data);

      return id;
    } catch (err) {
      console.log(err.response);
      return rejectWithValue(err.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `/api/product/${id}`,
        data
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);