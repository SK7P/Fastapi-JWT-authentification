import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK Query API slice for Users CRUD
export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/users',
        prepareHeaders: (headers, { getState }) => {
            // Attach access token
            const token = (getState() as any).auth.accessToken;
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['Users'], // tag for cache invalidation
    endpoints: (builder) => ({
        // Get all users
        getUsers: builder.query<any[], void>({
            query: () => '/',
            providesTags: ['Users'], // cache tag
        }),
        // Add a new user
        addUser: builder.mutation<void, { name: string; email: string }>({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Users'], // refresh user list
        }),
        // Update user
        updateUser: builder.mutation<void, { id: number; name: string; email: string }>({
            query: ({ id, ...body }) => ({
                url: `/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Users'],
        }),
        // Delete user
        deleteUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation } = usersApi;
