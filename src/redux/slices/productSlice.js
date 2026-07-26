import { createSlice } from "@reduxjs/toolkit";

import {
  addProduct,
  fetchAllProducts,
  fetchSingleProduct,
} from "../actions/productAction";

const initialState = {
  isLoading: false,

  products: [],

  product: null,

  isError: "",

  isCreate: false,
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    // =====================
    // Add Product
    // =====================

    builder.addCase(addProduct.pending, (state) => {
      state.isLoading = true;
      state.isCreate = false;
    });

    builder.addCase(addProduct.fulfilled, (state) => {
      state.isLoading = false;
      state.isCreate = true;
    });

    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.isCreate = false;
    });

    // =====================
    // Get All Products
    // =====================

    builder.addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });

    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    // =====================
    // Get Single Product
    // =====================

    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });

    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

  },
});

export default productSlice.reducer;