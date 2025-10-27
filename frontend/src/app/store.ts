import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/authApi';
import { usersApi } from '../features/users/usersApi';
import { dashboardApi } from '../features/dashboard/dashboardApi';

// Configure Redux store
// Combines standard slices and RTK Query API slices
export const store = configureStore({
    reducer: {
        auth: authReducer,                   // auth state (access token, isAuthenticated)
        [authApi.reducerPath]: authApi.reducer,      // RTK Query auth endpoints
        [usersApi.reducerPath]: usersApi.reducer,    // RTK Query users endpoints
        [dashboardApi.reducerPath]: dashboardApi.reducer, // RTK Query dashboard endpoints
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(usersApi.middleware)
            .concat(dashboardApi.middleware), // RTK Query middleware for caching & invalidation
});

// Type helpers for useSelector and useDispatch in TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
