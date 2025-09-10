// src/utils/authHelpers.ts
import { Alert } from 'react-native';
import Storage, { StorageKeys } from './storage';
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { AppDispatch } from '../redux/store'; // adjust path if different
import { setToken } from '../redux/AuthSlice';
import { BASE_URL, ENDPOINTS } from './api';
import axios from 'axios';

// Simple local sign-in
export const signIn = async (dispatch: AppDispatch, token: string) => {
  try {
    await Storage.setItem(StorageKeys.USER_TOKEN, token);
    dispatch(setToken(token));
    Alert.alert("✅ Login Success", token);
  } catch (error: any) {
    Alert.alert("❌ Sign-in Error", error?.message || String(error));
  }
};

// Facebook Login
export const facebookLogin = async (dispatch: AppDispatch) => {
  try {
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
      "pages_show_list",
      "pages_read_engagement",
      "pages_manage_posts",
      "pages_read_user_content",
    ]);

    if (result.isCancelled) {
      Alert.alert("Login cancelled by user");
      return;
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      Alert.alert("Error", "Unable to get Facebook access token");
      return;
    }

    const fbAccessToken = data.accessToken.toString();


    // ✅ Call your backend API with Facebook access token
    const response = await axios.post(`${BASE_URL}${ENDPOINTS.facebookLogin}`, {
      accessToken: fbAccessToken,
    });

    console.log("📡 Facebook API Response:", response.data);

    // ✅ Save token locally (redux)
    dispatch(setToken(fbAccessToken));
    Alert.alert("✅ Facebook Login Success", JSON.stringify(response.data));

  } catch (error: any) {
    console.error("❌ Facebook Login Error:", error);
    Alert.alert("❌ Facebook Login Error", error?.message || String(error));
  }
};
