// src/utils/SocialShare.ts
import { Alert } from 'react-native';


export const shareToFacebook = async (post: { title: string; image: any}) => {

    console.log("post====>",post)
  try {
    console.log("Sharing to Facebook:", post);
    Alert.alert("Shared to Facebook!");
  } catch (error) {
    console.error("Facebook share error:", error);
  }
};

