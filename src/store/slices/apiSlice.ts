import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { HeroResponse } from "../../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.disneyapi.dev" }),
  endpoints: (builder) => ({
    listHeroes: builder.query<
      HeroResponse,
      { page?: number; rowsPerPage?: number; name?: string }
    >({
      query: (args) => {
        const { page, rowsPerPage, name } = args;
        let url = `/character?`;
        if (page && page > 1) url += `page=${page}&`;
        if (rowsPerPage) url += `pageSize=${rowsPerPage}&`;
        if (name) url += `name=${name}`;
        return {
          url,
        };
      },
    }),
  }),
});

export const { useListHeroesQuery } = apiSlice;
