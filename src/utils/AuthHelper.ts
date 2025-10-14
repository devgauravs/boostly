// src/utils/authHelpers.ts
import { Alert } from 'react-native';
import Storage, { StorageKeys } from './storage';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { AppDispatch } from '../redux/store'; // adjust path if different
import { setfacebooktoken, setFacebookUser, setinstagramtoken, setInstagramUser, setSocialName, setToken, setUser, setUserId, setyoutubetoken, setyoutubeuser, } from '../redux/AuthSlice';
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
    // Step 1: Ask for Facebook permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'pages_show_list',
      'pages_read_engagement',
      'pages_manage_posts',
      'pages_read_user_content',
      'business_management',
    ]);

    if (result.isCancelled) {
      Alert.alert('Login cancelled by user');
      return;
    }

    // Step 2: Get access token
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      Alert.alert('Error', 'Unable to get Facebook access token');
      return;
    }

    const fbAccessToken = data.accessToken.toString();
    console.log('fbAccessToken:', fbAccessToken);

    // Step 3: Fetch user's Facebook Pages
    const pagesResponse = await fetch(
      `https://graph.facebook.com/me/accounts?access_token=${fbAccessToken}`
    );
    const pagesData = await pagesResponse.json();
    console.log('Facebook Pages Response:', pagesData);

    if (pagesData?.data?.length > 0) {
      const pageId = pagesData.data[0].id;
      console.log('✅ First Page ID:', pageId);
    } else {
      console.log('⚠️ No Facebook pages found for this user.');
    }

    // Step 4: Backend login API call
    const endpoint =
      userId === undefined
        ? ENDPOINTS.facebookLogin
        : ENDPOINTS?.facebookinsideLogin;

    const response = await axios.post(`${BASE_URL}${endpoint}`, {
      accessToken: fbAccessToken,
      ...(userId ? { userId } : {}),
    });

    // Step 5: Success handling
    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      text2: 'You are now logged in with Facebook!',
    });


    // insideLogin: only save Facebook-specific info
    dispatch(setfacebooktoken(fbAccessToken));
    dispatch(setFacebookUser(response?.data?.user));
    dispatch(setSocialName('facebook'));

    // normal login: save generic + Facebook-specific info
    dispatch(setToken(fbAccessToken));
    dispatch(setUser(response?.data?.user));
    dispatch(setUserId(response?.data?.user?._id));

  } catch (error: any) {
    console.error('Facebook Login Error:', error);
    Toast.show({
      type: 'error',
      text1: 'Login Failed',
      text2: error?.message || 'Something went wrong.',
    });
  }
};



export const instagramLogin = async (dispatch: AppDispatch, userId?: string) => {
  try {
    // Step 1️⃣ — Ask for required permissions
    const result = await LoginManager.logInWithPermissions([
      'instagram_basic',
      'pages_show_list',
      'instagram_content_publish',
      'instagram_manage_comments',
      'instagram_manage_messages',
      'business_management',
      'pages_read_engagement'
    ]);

    if (result.isCancelled) {
      Alert.alert('Login cancelled by user');
      return;
    }

    // Step 2️⃣ — Get access token
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      Alert.alert('Error', 'Unable to get Facebook access token');
      return;
    }

    const fbAccessToken = data.accessToken.toString();
    console.log('🔑 Facebook Access Token:', fbAccessToken);

    // Step 3️⃣ — Get Facebook Pages connected to user
    const pagesResponse = await axios.get(
      `https://graph.facebook.com/v18.0/me/accounts?access_token=${fbAccessToken}`
    );

    if (!pagesResponse.data?.data?.length) {
      Alert.alert('No Facebook Pages found', 'This account has no linked Pages.');
      return;
    }

    const page = pagesResponse.data.data[0];
    const pageId = page.id;
    const pageAccessToken = page.access_token;

    console.log('📄 Page ID:', pageId);
    console.log('📄 Page Access Token:', pageAccessToken);

    // Step 4️⃣ — Get Instagram Business Account connected to that page
    const igResponse = await axios.get(
      `https://graph.facebook.com/v18.0/${pageId}?fields=instagram_business_account&access_token=${pageAccessToken}`
    );


    const instagramBusinessId = igResponse.data.instagram_business_account?.id;

    if (!instagramBusinessId) {
      Alert.alert(
        'Instagram Not Connected',
        'This Facebook Page is not linked to any Instagram Business Account.'
      );
      return;
    }

    console.log('📸 Instagram Business Account ID:', instagramBusinessId);

    // Step 5️⃣ — Call your backend login endpoint
    const endpoint =
      userId === undefined
        ? ENDPOINTS.instagramLogin
        : ENDPOINTS.instgraminsideLogin;

    const response = await axios.post(`${BASE_URL}${endpoint}`, {
      accessToken: fbAccessToken,
      ...(userId ? { userId } : {}),
    });

    console.log("InstagramInsideResponse", response)
    // Step 6️⃣ — Handle success
    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      text2: 'You are now logged in with Instagram!',
    });


    // insideLogin: only save Facebook-specific info
    dispatch(setinstagramtoken(fbAccessToken));
    dispatch(setInstagramUser(response?.data?.user));

    // normal login: save generic + Facebook-specific info
    dispatch(setToken(fbAccessToken));
    dispatch(setUser(response?.data?.user));
    dispatch(setUserId(response?.data?.user?._id));
    dispatch(setSocialName('instagram'));



    // Optional: return data if needed by frontend
    return {
      fbAccessToken,
      pageAccessToken,
      pageId,
      instagramBusinessId,
    };
  } catch (error: any) {
    console.error('❌ Instagram Login Error:', error.response?.data || error.message);
    Toast.show({
      type: 'error',
      text1: 'Login Failed',
      text2: error?.message || 'Something went wrong.',
    });
  }
};




let signingIn = false; // Prevent multiple sign-in calls

export const youtubeLogin = async (dispatch: AppDispatch, userId?: string) => {
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
    const enpoint =
      userId === undefined
        ? ENDPOINTS.youtubeLogin
        : ENDPOINTS?.appInsideYoutube;
    const response = await axios.post(`${BASE_URL}${enpoint}`, {
      accessToken: accessToken,
      ...(userId ? { userId } : {}),
    });


    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      text2: 'You are now logged in with Youtube!',
    });

    // insideLogin: only save Facebook-specific info
    dispatch(setyoutubetoken(accessToken));
    dispatch(setyoutubeuser(response?.data?.user));
    dispatch(setSocialName('youtube'));
    // normal login: save generic + Facebook-specific info
    dispatch(setToken(accessToken));
    dispatch(setUser(response?.data?.user));
    dispatch(setUserId(response?.data?.user?._id));
  } catch (error: any) {
    console.error('❌ Google Signin error (detailed):', JSON.stringify(error, null, 2));
  } finally {
    signingIn = false; // Reset flag
    console.log('🔄 Reset sign-in flag');
  }
};
