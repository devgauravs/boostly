// src/utils/authHelpers.ts
import { Alert } from 'react-native';
import Storage, { StorageKeys } from './storage';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { AppDispatch } from '../redux/store'; // adjust path if different
import { setToken, setUser, setUserId } from '../redux/AuthSlice';
import { BASE_URL, ENDPOINTS } from './api';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// Simple local sign-in
export const signIn = async (dispatch: AppDispatch, token: string) => {
  try {
    await Storage.setItem(StorageKeys.USER_TOKEN, token);
    dispatch(setToken(token));
    Alert.alert('✅ Login Success', token);
  } catch (error: any) {
    Alert.alert('❌ Sign-in Error', error?.message || String(error));
  }
};

// Facebook Login
export const facebookLogin = async (dispatch: AppDispatch, userId?: string) => {

  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'pages_show_list',
      'pages_read_engagement',
      'pages_manage_posts',
      'pages_read_user_content',
    ]);

    if (result.isCancelled) {
      Alert.alert('Login cancelled by user');
      return;
    }
    const data = await AccessToken.getCurrentAccessToken();

    console.log("responseofFacebok",data)
    if (!data) {
      Alert.alert('Error', 'Unable to get Facebook access token');
      return;
    }
    // console.log('facebookLoginRespone==>', data);
    const fbAccessToken = data.accessToken.toString();
    console.log('fbAccessToken', fbAccessToken);
    const enpoint =
      userId === undefined
        ? ENDPOINTS.facebookLogin
        : ENDPOINTS?.facebookinsideLogin;
    const response = await axios.post(`${BASE_URL}${enpoint}`, {
      accessToken: fbAccessToken,
      ...(userId ? { userId } : {}),
    });
    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      text2: 'You are now logged in with Facebook!',
    });
    dispatch(setToken(fbAccessToken));
    dispatch(setUser(response?.data?.user));
    dispatch(setUserId(response?.data?.user?._id));
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: 'Login Failed',
      text2: error?.message || 'Something went wrong.',
    });
  }
};




let signingIn = false; // Prevent multiple sign-in calls

export const youtubeLogin = async (dispatch: AppDispatch) => {
  if (signingIn) {
    console.log('⚠️ Sign-in already in progress, skipping...');
    return;
  }

  signingIn = true;
  console.log('🚀 Starting YouTube login...');

  try {
    // 1. Check Play Services (Android only)
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    console.log('✅ Play services available');

    // 2. Trigger Google Sign-In
    const signInResult = await GoogleSignin.signIn();
    console.log('👤 Sign-in Result:', signInResult);

    // 3. Get tokens (accessToken needed for YouTube API)
    const tokens = await GoogleSignin.getTokens();
    console.log('🔑 Tokens:', tokens);

    const { user } = signInResult;
    const { accessToken } = tokens;

    // 4. Dispatch accessToken to Redux
    if (accessToken) {
      dispatch(setToken(accessToken));
      console.log('🎥 Access Token stored in Redux:', accessToken);
    }

    // 5. Show success toast
    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      text2: `Welcome ${user?.name || 'User'}!`,
    });

    return accessToken;
  } catch (error: any) {
    console.error('❌ Google Signin error (detailed):', JSON.stringify(error, null, 2));
    Toast.show({
      type: 'error',
      text1: 'Login Failed',
      text2: error?.message || 'Something went wrong with YouTube login.',
    });
  } finally {
    signingIn = false; // Reset flag
    console.log('🔄 Reset sign-in flag');
  }
};
  