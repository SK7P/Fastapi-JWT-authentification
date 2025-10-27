import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from './authSlice';

// RTK Query API slice for authentication
export const authApi = createApi({
    reducerPath: 'authApi', // unique key in Redux store
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/auth', // backend auth endpoints
        credentials: 'include', // include httpOnly refresh cookie
        prepareHeaders: (headers, { getState }) => {
            // Attach access token to each request
            const token = (getState() as any).auth.accessToken;
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // LOGIN endpoint (POST)
        login: builder.mutation<{ access_token: string }, { email: string; password: string }>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({ accessToken: data.access_token })); // store token
                } catch {
                    dispatch(logout()); // logout on error
                }
            },
        }),

        // Get current user info (GET /me)
        getUser: builder.query<{ id: number; name: string; email: string }, void>({
            query: () => '/me',
        }),

        // Refresh token endpoint (POST /refresh)
        refresh: builder.mutation<{ access_token: string }, void>({
            query: () => ({
                url: '/refresh',
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({ accessToken: data.access_token })); // update token
                } catch {
                    dispatch(logout());
                }
            },
        }),
    }),
});

// Export hooks to use in React components
export const { useLoginMutation, useGetUserQuery, useRefreshMutation } = authApi;
