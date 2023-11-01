import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl: string = process.env.NODE_ENV === 'production' ? window.location.href : 'http://localhost:3001/'

export const robotApi = createApi({
    reducerPath: 'robotApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getStatus: builder.query({ query: () => '/status' }),
        getMapWaypoints: builder.query({ query: () => '/map-waypoints' }),
        postLid: builder.mutation({
            query: (lid) => ({ url: '/set-lid', method: 'POST', body: lid }),
        }),
        postGoal: builder.mutation({
            query: (location) => ({
                url: '/set-goal',
                method: 'POST',
                body: location,
            }),
        }),
    }),
})

export const { useGetStatusQuery, useGetMapWaypointsQuery, usePostLidMutation, usePostGoalMutation } = robotApi
