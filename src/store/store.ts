import { configureStore } from "@reduxjs/toolkit";
import heroReducer from "./slices/heroSlice";
import { apiSlice } from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    hero: heroReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(apiSlice.middleware),
});
