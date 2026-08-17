import { createSlice } from "@reduxjs/toolkit";
import { getCart, addToCart, updateCartItem } from "../actions/cartAction";

const initialState = {
  isLoading: false,
  cart: { products: [] },
  isError: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getCart
    builder.addCase(getCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload || { products: [] };
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    // addToCart
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    // updateCartItem
    builder.addCase(updateCartItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCartItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    });
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export default cartSlice.reducer;