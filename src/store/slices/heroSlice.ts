import { createSlice } from "@reduxjs/toolkit";

import type { HeroState } from "../../types";

const initialState: HeroState = {
  heroes: [],
  info: {
    count: 0,
    nextPage: null,
    previousPage: null,
    totalPages: 0,
  },
};

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {},
});

export default heroSlice.reducer;
