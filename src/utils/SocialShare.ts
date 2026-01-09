// src/utils/facebook.ts
import axios from 'axios';
import { Alert } from 'react-native';
import { BASE_URL, ENDPOINTS } from './api';
import Toast from 'react-native-toast-message';
import { shareToFacebook } from './facebookShare';

type Post = { _id: string };

// export const postToPage = async (
//   item: Post,
//   userId: string,
//   action: 'accept' | 'reject',
//   platform: 'facebook' | 'instagram' | 'youtube'
// ) => {
//   const data = {
//     mediaId: item._id,
//     userAction: action,
//     userId,
//   };

//   let endpoint = '';
//   if (platform === 'facebook') endpoint = ENDPOINTS.singlepostfacebook;
//   if (platform === 'instagram') endpoint = ENDPOINTS.singlepostinstagram;
//   if (platform === 'youtube') endpoint = ENDPOINTS.singlepostyoutube;

//   try {
//     /** FACEBOOK FLOW */
//     if (platform === 'facebook' && action === 'accept') {
//       const shared = await shareToFacebook(item.url);

//       if (!shared) {
//         // ❌ USER CANCELLED → STOP HERE
//         Toast.show({
//           type: 'info',
//           text1: 'Post cancelled',
//           text2: 'Facebook sharing was cancelled',
//         });
//         return null;
//       }
//     }

//     /** ✅ CALL API ONLY WHEN SHARED */
//     const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
//       headers: { 'Content-Type': 'application/json' },
//     });

//     /** ✅ SUCCESS TOAST */
//     Toast.show({
//       type: 'success',
//       text1: 'Post uploaded successfully',
//       text2: `Shared on ${platform}`,
//     });

//     return response.data;
//   } catch (error) {
//     console.error('PostToPage error:', error);

//     Toast.show({
//       type: 'error',
//       text1: 'Upload failed',
//       text2: `Could not post on ${platform}`,
//     });

//     return null;
//   }
// };

// export const postToPage = async (
//   item: Post,
//   userId: string,
//   action: "accept" | "reject",
//   platform: "facebook" | "instagram" | "youtube" // ✅ added platform param
// ) => {
//   const data = {
//     mediaId: item?._id,
//     userAction: action,
//     userId: userId,
//   };
//     console.log("data===>---",data)

//   // ✅ Select API endpoint based on platform
//   let endpoint = "";
//   if (platform === "facebook") {
//     endpoint = ENDPOINTS.singlepostfacebook;
//   } else if (platform === "instagram") {
//     endpoint = ENDPOINTS.singlepostinstagram;
//   } else if (platform === "youtube") {
//     endpoint = ENDPOINTS.singlepostyoutube;
//   } else {
//     console.error("❌ Invalid platform specified");
//     return null;
//   }

//   try {
//     const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("✅ postToPage response:", response.data);

//     if (action === "accept") {
//       Toast.show({
//         type: "success",
//         text1: `Post approved successfully on ${platform}`,
//       });
//     } else if (action === "reject") {
//       Toast.show({
//         type: "info",
//         text1: `Post rejected successfully on ${platform}`,
//       });
//     }

//     return response.data;
//   } catch (err: any) {
//     console.error("❌ postToPage API ERROR:", err?.response || err);
//     Toast.show({
//       type: "error",
//       text1: `Failed to ${action} post on ${platform}`,
//     });
//     return null;
//   }
// };

// type Post = { _id: string; url?: string };

export const postToPage = async (
  item: Post,
  userId: string,
  action: 'accept' | 'reject',
  platform: 'facebook' | 'instagram' | 'youtube',
  facebookPageId?: string, // optional Page ID
) => {
  const data = {
    mediaId: item?._id,
    userAction: action,
    userId,
    ...(facebookPageId && { pageId: facebookPageId }), // include pageId if available
  };

  console.log('postToPage data:', data);

  let endpoint = '';

  if (platform === 'facebook') {
    endpoint = ENDPOINTS.singlepostfacebook;
  } else if (platform === 'instagram') {
    endpoint = ENDPOINTS.singlepostinstagram;
  } else if (platform === 'youtube') {
    endpoint = ENDPOINTS.singlepostyoutube;
  } else {
    console.error('Invalid platform specified');
    return null;
  }

  try {
    if (platform === 'facebook' && facebookPageId) {
      const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
        headers: { 'Content-Type': 'application/json' },
      });

      Toast.show({
        type: action === 'accept' ? 'success' : 'info',
        text1: `Post ${action}ed successfully on ${platform}`,
      });

      console.log('postToPage response:', response.data);
      return response.data;
    }

    const shared = await shareToFacebook(item.url);
    if (!shared) {
      Toast.show({
        type: 'info',
        text1: 'Post cancelled',
        text2: 'Facebook sharing was cancelled',
      });
    
      return null;
    }
  } catch (error: any) {
    console.error('postToPage API error:', error?.response || error);
    Toast.show({
      type: 'error',
      text1: `Failed to ${action} post on ${platform}`,
    });
    return null;
  }
};

export const approveAllPosts = async (userId: string) => {
  const data = {
    userId: userId,
  };

  console.log('paramdata==>', data);

  try {
    const response = await axios.post(
      `${BASE_URL}${ENDPOINTS.allApprove}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (err: any) {
    console.error('API ERROR:', err);
    return null;
  }
};

export const setAutoApproval = async (userId: string, status: boolean) => {
  console.log('userId', userId);
  console.log('status', status);
  try {
    const response = await axios.post(
      `${BASE_URL}${ENDPOINTS.autoApprovel}${userId}`,
      { autoApproval: status },
      { headers: { 'Content-Type': 'application/json' } },
    );
    console.log('responseData==>', response);
    return response.data;
  } catch (error: any) {
    console.error('AutoApproval API error:', error);
    throw error;
  }
};
