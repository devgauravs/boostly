// src/utils/facebook.ts
import axios from "axios";
import { Alert } from "react-native";
import { BASE_URL, ENDPOINTS } from "./api";
import Toast from "react-native-toast-message";




type Post = {
  _id: string;

};

export const postToPage = async (
  item: Post,
  userId: string,
  action: "accept" | "reject",
  platform: "facebook" | "instagram" | "youtube" // ✅ added platform param
) => {
  const data = {
    mediaId: item?._id,
    userAction: action,
    userId: userId,
  };
    // console.log("data===>",data)

  // ✅ Select API endpoint based on platform
  let endpoint = "";
  if (platform === "facebook") {
    endpoint = ENDPOINTS.singlepostfacebook;
  } else if (platform === "instagram") {
    endpoint = ENDPOINTS.singlepostinstagram;
  } else if (platform === "youtube") {
    endpoint = ENDPOINTS.singlepostyoutube;
  } else {
    console.error("❌ Invalid platform specified");
    return null;
  }



  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ postToPage response:", response.data);

    if (action === "accept") {
      Toast.show({
        type: "success",
        text1: `Post approved successfully on ${platform}`,
      });
    } else if (action === "reject") {
      Toast.show({
        type: "info",
        text1: `Post rejected successfully on ${platform}`,
      });
    }

    return response.data;
  } catch (err: any) {
    console.error("❌ postToPage API ERROR:", err?.response || err);
    Toast.show({
      type: "error",
      text1: `Failed to ${action} post on ${platform}`,
    });
    return null;
  }
};

// export const postToPage = async (
//   item: Post,
//   userId: string,
//   action: "accept" | "reject",
  
// ) => {
//   const data = {
//     mediaId: item?._id,
//     userAction: action,
//     userId: userId,
  
//   };

//   // console.log("platform",platform)

//     try {
//     const response = await axios.post(
//       `${BASE_URL}${ENDPOINTS.media_Action}`,
//       data, 
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log("resposne=====>",response)
//     if (action === "accept") {
//       Toast.show({
//         type: 'success',
//         text1: 'Post approved successfully',
//       });
//     } else if (action === "reject") {
//       Toast.show({
//         type: 'info',
//         text1: 'Post rejected successfully',
//       });
//     }
    
//     return response.data;
//   } catch (err: any) {
//     console.error("API ERROR:", err);
//     return null;
//   }
// };


export const approveAllPosts = async (
  userId: string,
) => {
  const data = {
    userId: userId
  };

  console.log("paramdata==>", data);
  
    try {

    const response = await axios.post(
      `${BASE_URL}${ENDPOINTS.allApprove}`,
      data, 
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    return response.data;
  } catch (err: any) {
    console.error("API ERROR:", err);
    return null;
  }
};

export const setAutoApproval = async (userId: string, status: boolean) => {

  try {
    const response = await axios.post(
      `${BASE_URL}${ENDPOINTS.autoApprovel}${userId}`, // include user id if needed
      { autoApproval: status },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error: any) {
    console.error("AutoApproval API error:", error);
    throw error;
  }
};

