import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";
import searchReducer from "./slices/searchSlice";
import wishlistReducer from "./slices/wishlistSlice";

export const store = configureStore({
    reducer: {
        authStore: authReducer,
        categoryStore: categoryReducer,
        productStore: productReducer,
        searchStore: searchReducer,
        wishlistStore: wishlistReducer,
    },
})