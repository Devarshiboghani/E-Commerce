import { createSlice } from "@reduxjs/toolkit";
import {
  addWishlist,
  getWishlist,
  removeWishlist,
} from "../actions/wishlistAction";

const initialState = {
  wishlist: [],
  isLoading: false,
  isError: null,
  isSuccess: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // ===========================
    // Add Wishlist
    // ===========================

    builder.addCase(addWishlist.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });

    builder.addCase(addWishlist.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });

    builder.addCase(addWishlist.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    // ===========================
    // Get Wishlist
    // ===========================

    builder.addCase(getWishlist.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getWishlist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wishlist = action.payload;
    });

    builder.addCase(getWishlist.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    // ===========================
    // Remove Wishlist
    // ===========================

    builder.addCase(removeWishlist.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(removeWishlist.fulfilled, (state, action) => {
      state.isLoading = false;

      state.wishlist = state.wishlist.filter(
        (item) => item._id !== action.meta.arg
      );
    });

    builder.addCase(removeWishlist.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export default wishlistSlice.reducer;
