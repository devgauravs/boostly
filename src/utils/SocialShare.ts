// src/utils/facebook.ts
import axios from "axios";
import { Alert } from "react-native";
import { BASE_URL, ENDPOINTS } from "./api";

// ✅ Fetch pages user manages
export const fetchUserPages = async (
  fbToken: string,
  setPageId: (id: string) => void,
  setPageAccessToken: (token: string) => void,
  fetchPagePosts: (id: string, token: string) => void
) => {
  if (!fbToken) return Alert.alert("Error", "No Facebook token found!");

  try {
    const res = await fetch(
      `https://graph.facebook.com/me/accounts?access_token=${fbToken}`
    );
    const json = await res.json();
    console.log("response==>", json);

    if (json.data && json.data.length > 0) {
      const page = json.data[0];
      setPageId(page.id);
      setPageAccessToken(page.access_token);
      fetchPagePosts(page.id, page.access_token);
    } else {
      Alert.alert("No Pages", "This account doesn’t manage any pages.");
    }
  } catch (err) {
    console.error(err);
    Alert.alert("Error", "Failed to fetch pages.");
  }
};

// ✅ Fetch posts from a page
export const fetchPagePosts = async (
  pageId: string,
  pageToken: string,
  setPosts: (posts: any[]) => void,
  setLoading: (loading: boolean) => void
) => {
  if (!pageId || !pageToken) return;
  setLoading(true);

  try {
    const res = await fetch(
      `https://graph.facebook.com/${pageId}/posts?fields=id,message,likes.summary(true),comments.limit(3){from,message},created_time&access_token=${pageToken}`
    );
    const json = await res.json();
    console.log("data==>", json);

    if (json.error) {
      console.error("Facebook API error:", json.error);
      Alert.alert("Error", json.error.message);
      setPosts([]);
    } else if (Array.isArray(json.data)) {
      setPosts(json.data);
    } else {
      setPosts([]);
    }
  } catch (err) {
    console.error("Fetch posts error:", err);
    setPosts([]);
  } finally {
    setLoading(false);
  }
};

// ✅ Post image to page
export const postToPage = async (
  selectedImage: string,
  pageId: string,
  pageAccessToken: string
) => {
  
  if (!selectedImage) return Alert.alert('Pick an image first!');
  if (!pageId || !pageAccessToken)
    return Alert.alert('Fetch Pages First', "Click 'Get My Pages' first");

  try {
    // Post image to Facebook page
    const formData = new FormData();
    formData.append('caption', '🚀 Posted from my app');
    formData.append('source', {
      uri: selectedImage,
      type: 'image/jpeg',
      name: 'photo.jpg',
    } as any);

    const fbResponse = await fetch(
      `https://graph.facebook.com/${pageId}/photos?access_token=${pageAccessToken}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const fbJson = await fbResponse.json();
    console.log('PAGE_POST', fbJson);

    if (!fbJson.id) {
      return Alert.alert('❌ Error', 'Failed to post image to Facebook.');
    }

    // Call media-action API after successful Facebook post
    const mediaData = {
      mediaId: fbJson.id,
      userAction: 'accept',
    };

    const userUploadMedia = await axios.post(
      `${BASE_URL}${ENDPOINTS?.media_Action}`,
      mediaData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${pageAccessToken}`, 
        },
      }
    );

    if (userUploadMedia?.data?.success === true) {
      Alert.alert('✅ Success', 'Image posted to Page and media action saved!');
    } else {
      Alert.alert(
        '❌ Error',
        userUploadMedia?.data || 'Media action failed after Facebook post.'
      );
    }
  } catch (err: any) {
    console.error(err);
    Alert.alert('Upload failed', err?.message || String(err));
  }
};

