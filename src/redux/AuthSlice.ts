// src/redux/AuthSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import Storage, { StorageKeys } from '../utils/storage';
import { AuthService } from '../services/AuthService/authService';
import {
  LoginCredentials,
  RegisterData,
  UpdateProfileParams,
  User,
} from '../services/AuthService/types';
import Toast from 'react-native-toast-message';

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isLoading: false,
  error: null,
  userId: null,
};

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(credentials);
      await Storage.setItem(StorageKeys.USER_TOKEN, response.token);
      await Storage.setItem(StorageKeys.USER, JSON.stringify(response.user));
      Toast.show({
        text1: 'Success',
        text2: response.message,
        type: 'success',
      });
      return response;
    } catch (error: any) {
      const message = error?.data?.message || 'Login failed';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      return rejectWithValue(message);
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(userData);
      await Storage.setItem(StorageKeys.USER_TOKEN, response.token);
      await Storage.setItem(StorageKeys.USER, JSON.stringify(response.user));

      Toast.show({
        text1: 'Success',
        text2: response.message,
        type: 'success',
      });
      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Registration failed';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      return rejectWithValue(message);
    }
  },
);
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (
    { userId, userData }: { userId: string; userData: UpdateProfileParams },
    { rejectWithValue },
  ) => {
    try {
      const response = await AuthService.updateProfile(userId, userData);
      await Storage.setItem(StorageKeys.USER, JSON.stringify(response.user));

      Toast.show({
        text1: 'Success',
        text2: response.message,
        type: 'success',
      });
      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || 'Update failed';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      return rejectWithValue(message);
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
      await Storage.setItem(StorageKeys.USER, JSON.stringify(response.user));
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
      await Storage.removeItem(StorageKeys.USER);
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  },
);

// Initialize auth state from storage
export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = await Storage.getItem(StorageKeys.USER_TOKEN);
      const userString = await Storage.getItem(StorageKeys.USER);

      if (token && userString) {
        const user = JSON.parse(userString);
        return { token, user };
      }

      return { token: null, user: null };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to initialize auth');
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
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearToken(state) {
      state.token = null;
      state.user = null;
    },
    clearError(state) {
      state.error = null;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload; // 👈 save userId
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
        state.userId = action.payload.user?._id || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
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
        state.userId = action.payload.user?._id || null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Profile
    builder
      .addCase(updateProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
        state.userId = action.payload.user?._id || null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
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
        state.userId = action.payload.user?._id || null;
      })
      .addCase(facebookLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder.addCase(logout.fulfilled, state => {
      state.token = null;
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.userId = null;
    });

    // Initialize Auth
    builder
      .addCase(initializeAuth.pending, state => {
        state.isLoading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setToken, setUser, clearToken, clearError, setUserId } =
  authSlice.actions;
export default authSlice.reducer;
