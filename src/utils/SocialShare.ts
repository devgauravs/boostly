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
  action: "accept" | "reject"
) => {
  const data = {
    mediaId: item?._id,
    userAction: action,
    userId: userId
  };

  console.log("paramdata==>", data);

    try {

    const response = await axios.post(
      `${BASE_URL}${ENDPOINTS.media_Action}`,
      data, 
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (action === "accept") {
      Toast.show({
        type: 'success',
        text1: 'Post approved successfully',
      });
    } else if (action === "reject") {
      Toast.show({
        type: 'info',
        text1: 'Post rejected successfully',
      });
    }
    return response.data;
  } catch (err: any) {
    console.error("API ERROR:", err);
    return null;
  }
};


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


