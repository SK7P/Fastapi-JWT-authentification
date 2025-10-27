import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the auth state
interface AuthState {
    accessToken: string | null; // JWT access token
    isAuthenticated: boolean;   // true if user is logged in
}

// Initial state
const initialState: AuthState = {
    accessToken: null,
    isAuthenticated: false,
};

// Create a slice for auth
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Save the access token and mark as authenticated
        setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        },
        // Clear auth state on logout
        logout: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
        },
    },
});

// Export actions to use in components or RTK Query side effects
export const { setCredentials, logout } = authSlice.actions;

// Export the reducer to add to the Redux store
export default authSlice.reducer;
