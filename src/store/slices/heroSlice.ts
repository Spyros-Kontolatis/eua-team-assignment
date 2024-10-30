import { createSlice } from "@reduxjs/toolkit";

export interface Hero {
  name: string;
  films: Array<string>;
  tvShows: Array<string>;
  videoGames: Array<string>;
  allies: Array<string>;
  enemies: Array<string>;
  imageUrl: string;
}
export interface HeroResponse {
  data: Array<Hero>;
  info: {
    count: number;
    nextPage: string | null;
    previousPage: string | null;
    totalPages: number;
  };
}

export interface HeroState {
  heroes: Array<Hero>;
  info: HeroResponse["info"];
}

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
