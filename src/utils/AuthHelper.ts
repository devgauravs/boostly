// src/utils/authHelpers.ts
import { Alert } from 'react-native';
import Storage, { StorageKeys } from './storage';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { AppDispatch } from '../redux/store'; // adjust path if different
import { setToken, setUser, setUserId } from '../redux/AuthSlice';
import { BASE_URL, ENDPOINTS } from './api';
import axios from 'axios';
import Toast from 'react-native-toast-message';

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
  console.log('callFacebookLoginuserId', userId);
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

    if (!data) {
      Alert.alert('Error', 'Unable to get Facebook access token');
      return;
    }
    console.log('facebookLoginRespone==>', data);
    const fbAccessToken = data.accessToken.toString();

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
