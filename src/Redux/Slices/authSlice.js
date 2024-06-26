

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create async thunk for login
export const loginAsync = createAsyncThunk(
    'auth/loginAsync',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL}/login-user`, { email, password });
            return { ...response.data, email };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Create async thunk for OTP verification

export const verifyOtpAsync = createAsyncThunk(
    'auth/verifyOtpAsync',
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL}/verify-otp`, { email, otp });
            localStorage.setItem("token", response.data.token);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        email: '',
        status: 'idle',
        error: null,
        user: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.email = action.payload.email;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                debugger
                state.status = 'failed';
                state.error = action?.payload?.message;
            })

            // Handle OTP verification
            .addCase(verifyOtpAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(verifyOtpAsync.fulfilled, (state) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
            })
            .addCase(verifyOtpAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message;
            });
    },
});

export default authSlice.reducer;
