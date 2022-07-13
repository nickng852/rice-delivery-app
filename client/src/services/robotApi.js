import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:4001/";

export const robotApi = createApi({
  reducerPath: "robotApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getStatus: builder.query({ query: () => "/status" }),
    postLid: builder.mutation({
      query: (lid) => ({ url: "/set-lid", method: "POST", body: lid }),
    }),
  }),
});

export const { useGetStatusQuery, usePostLidMutation } = robotApi;
