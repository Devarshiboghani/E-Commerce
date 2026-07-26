import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// =======================
// Add Wishlist
// =======================

export const addWishlist = createAsyncThunk(
  "wishlist/addWishlist",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/wishlist", data);
      return response.data;
    } catch (error) {
      console.log(error.response?.data); // 👈 ye add karo
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// =======================
// Get Wishlist
// =======================

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/wishlist?user=${user}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// =======================
// Remove Wishlist
// =======================

export const removeWishlist = createAsyncThunk(
  "wishlist/removeWishlist",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete("/api/wishlist", {
        data: { id },
      });

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message
      );
    }
  }
);