import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "../actions/authAction";

const initialState = {
  isLoading: false,
  isError: null,
  user: null,
  isCreate: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getProfile: (state) => {
      state.user = JSON.parse(sessionStorage.getItem("USER"));
    },

    logout: (state) => {
      state.user = null;
      sessionStorage.removeItem("USER");
    }
  },

  extraReducers: (builder) => {
    // sign Up user
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.isCreate = false;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isCreate = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.isCreate = false;
    });

    // sign In user
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.isCreate = false;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      sessionStorage.setItem("USER", JSON.stringify(action.payload));
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.isCreate = false;
    });
  },
});

export const { getProfile, logout } = authSlice.actions;

export default authSlice.reducer;
