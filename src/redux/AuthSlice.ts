// src/redux/AuthSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import Storage, { StorageKeys } from '../utils/storage';
import { AuthService } from '../services/AuthService/authService';
import {
  LoginCredentials,
  RegisterData,
  UpdateProfileParams,
  ResetPasswordData,
  User,
} from '../services/AuthService/types';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';

interface AuthState {
  token: string | null;
   instagramtoken: string | null;
    facebooktoken: string | null;
     youtubetoken: string | null;
  user: User | null;
    instagramuser: User | null;
      facebookuser: User | null;
        youtubeuser: User | null;
  isLoading: boolean;
  error: string | null;
  userId: string | null;
  fcmToken: string | null;
  profileImageData?: any;
 socialName: string | null; 
 facebookPageId: string | null;
}

const initialState: AuthState = {
  token: null,
  instagramtoken: null,
  facebooktoken: null,
  youtubetoken: null,
  instagramuser: null,
  facebookuser: null,
    facebookPageId: null,
  youtubeuser: null,
  user: null,
  isLoading: false,
  error: null,
  userId: null,
  fcmToken: null,
 socialName: null,

};

// Get FCM Token
export const getFCMToken = createAsyncThunk(
  'auth/getFCMToken',
  async (_, { rejectWithValue }) => {
    try {
      const fcmToken = await messaging().getToken();
      return fcmToken;
    } catch (error: any) {
      console.log('Error getting FCM token:', error);
      return rejectWithValue(error.message || 'Failed to get FCM token');
    }
  },
);

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const fcmToken = state.auth.fcmToken;

      const loginData = {
        ...credentials,
        ...(fcmToken && { fcmToken }),
      };

      const response = await AuthService.login(loginData);
            console.log("loginUser:", loginData);
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
  async (userData: RegisterData, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const fcmToken = state.auth.fcmToken;

      const registerData = {
        ...userData,
        ...(fcmToken && { fcmToken }),
      };

      const response = await AuthService.register(registerData);
     
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


export const updateProfileImage = createAsyncThunk(
  'auth/updateProfileImage',
  async (
    { image }: { image: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthService.updateProfilePicture(image);
      await Storage.setItem(StorageKeys.USER, JSON.stringify(response?.data));

      Toast.show({
        text1: 'Success',
        text2: response.message,
        type: 'success',
      });
      return response;
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Update failed';
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

// Get user profile
export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await AuthService.getProfile(userId);
      await Storage.setItem(StorageKeys.USER, JSON.stringify(response.user));
      // Toast.show({
      //   text1: 'Success',
      //   text2: response.message,
      //   type: 'success',
      // });
      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to get profile';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      return rejectWithValue(message);
    }
  },
);

export const sendOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await AuthService.sendOtp(email);
      // await Storage.setItem(StorageKeys.USER, JSON.stringify(response));
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
        'Failed to get profile';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      return rejectWithValue(message);
    }
  },
);
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (
    { email, otp }: { email: string; otp: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await AuthService.verifyOtp(email, otp);
      // await Storage.setItem(StorageKeys.USER, JSON.stringify(response));
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
        'Failed to get profile';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      return rejectWithValue(message);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (passwordData: ResetPasswordData, { rejectWithValue }) => {
    try {
      const response = await AuthService.resetPassword(passwordData);
      Toast.show({
        text1: 'Success',
        text2: response.message || 'Password reset successful',
        type: 'success',
      });
      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to reset password';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      return rejectWithValue(message);
    }
  },
);

export const deleteAccount = createAsyncThunk(
  'auth/deleteAccount',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const userId = state.auth.userId || state.auth.user?._id;

      if (!userId) {
        const message = 'User ID not found';
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: message,
        });
        return rejectWithValue(message);
      }

      const response = await AuthService.deleteAccount(userId);

      await Storage.clearAll();

      Toast.show({
        text1: 'Success',
        text2: response.message || 'Account deleted successfully',
        type: 'success',
      });
      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to delete account';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      return rejectWithValue(message);
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
     setFacebookPageId(state, action: PayloadAction<string>) {
    state.facebookPageId = action.payload;
  },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
      setinstagramtoken(state, action: PayloadAction<string>) {
      state.instagramtoken = action.payload;
    },
      setfacebooktoken(state, action: PayloadAction<string>) {
      state.facebooktoken = action.payload;
    },
      setyoutubetoken(state, action: PayloadAction<string>) {
      state.youtubetoken = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    
      setInstagramUser(state, action: PayloadAction<User>) {
      state.instagramuser = action.payload;
    },
      setFacebookUser(state, action: PayloadAction<User>) {
      state.facebookuser = action.payload;
    },
      setyoutubeuser(state, action: PayloadAction<User>) {
      state.youtubeuser = action.payload;
    },
    clearToken(state) {
      state.token = null;
      state.user = null;
      state.fcmToken = null;
      state.instagramtoken = null;
  state.instagramuser = null;
  state.facebooktoken = null;
  state.facebookuser = null;
  state.youtubetoken = null;
  state.youtubeuser = null;
  state.socialName = null;
    },
    clearError(state) {
      state.error = null;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload; // 👈 save userId
    },
    setFCMToken(state, action: PayloadAction<string>) {
      state.fcmToken = action.payload;
    },
     setSocialName(state, action: PayloadAction<string>) {  // ✅ new reducer
    state.socialName = action.payload;
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
      state.fcmToken = null;
    });

    // Get Profile
    builder
      .addCase(getProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
        state.userId = action.payload.user?._id || null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
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
      })
      .addCase(verifyOtp.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        // you can update user or other state here if needed
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(resetPassword.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get FCM Token
      .addCase(getFCMToken.fulfilled, (state, action) => {
        state.fcmToken = action.payload;
      })
      .addCase(getFCMToken.rejected, (state, action) => {
        console.log('Failed to get FCM token:', action.payload);
      })
      // Delete Account
      .addCase(deleteAccount.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, state => {
        // Clear all state on successful account deletion
        state.isLoading = false;
        state.token = null;
        state.user = null;
        state.error = null;
        state.userId = null;
        state.fcmToken = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

    // Update Profile Image
    .addCase(updateProfileImage.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
    .addCase(updateProfileImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.profileImageData = action.payload.data;
    })
    .addCase(updateProfileImage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })

},
});

export const {
  setToken,
  setinstagramtoken,
  setfacebooktoken,
  setyoutubetoken,
  setInstagramUser,
  setFacebookUser,
  setyoutubeuser,
  setUser,
  clearToken,
  clearError,
  setUserId,
  setFCMToken,
  setSocialName,
  setFacebookPageId
} = authSlice.actions;
export default authSlice.reducer;
