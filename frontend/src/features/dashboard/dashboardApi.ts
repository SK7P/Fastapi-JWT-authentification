import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK Query API slice for Dashboard KPIs
export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/dashboard',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth.accessToken;
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getStats: builder.query<{ totalUsers: number; totalTeams: number; tasksCompleted: number }, void>({
            query: () => '/stats',
        }),
    }),
});

export const { useGetStatsQuery } = dashboardApi;
