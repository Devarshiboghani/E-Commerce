import { createSlice } from "@reduxjs/toolkit";
import { getCategories, addCategory, deleteCategory, updateCategory } from "../actions/categoryAction";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // GET Categories
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });

    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ADD Category
    builder.addCase(addCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories.push(action.payload);
    });

    builder.addCase(addCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (item) => item._id !== action.payload,
      );
    });

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.categories = state.categories.map((item) =>
        item._id === action.payload._id ? action.payload : item,
      );
    });
  },
});

export default categorySlice.reducer;
