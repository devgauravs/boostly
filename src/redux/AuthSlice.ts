// src/redux/AuthSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import Storage, { StorageKeys } from '../utils/storage';
import {
  AuthService,
  LoginCredentials,
  RegisterData,
} from '../services/AuthService/authService';

interface AuthState {
  token: string | null;
  user: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isLoading: false,
  error: null,
};

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(credentials);
      await Storage.setItem(StorageKeys.USER_TOKEN, response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(userData);
      await Storage.setItem(StorageKeys.USER_TOKEN, response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  },
);

export const facebookLogin = createAsyncThunk(
  'auth/facebookLogin',
  async (_, { rejectWithValue }) => {
    try {
      const facebookToken = await AuthService.getFacebookToken();
      const response = await AuthService.facebookLogin(facebookToken);
      await Storage.setItem(StorageKeys.USER_TOKEN, response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Facebook login failed');
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await Storage.removeItem(StorageKeys.USER_TOKEN);
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = null;
      state.user = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Login
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        Alert.alert('❌ Login Error', action.payload as string);
      });

    // Register
    builder
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        Alert.alert('❌ Registration Error', action.payload as string);
      });

    // Facebook Login
    builder
      .addCase(facebookLogin.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(facebookLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
        Alert.alert('✅ Facebook Login Success');
      })
      .addCase(facebookLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        Alert.alert('❌ Facebook Login Error', action.payload as string);
      });

    // Logout
    builder.addCase(logout.fulfilled, state => {
      state.token = null;
      state.user = null;
      state.isLoading = false;
      state.error = null;
    });
  },
});

export const { setToken, clearToken, clearError } = authSlice.actions;
export default authSlice.reducer;
