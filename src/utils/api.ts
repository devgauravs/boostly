import { youtube } from "../assets/images";

// src/utils/api.ts
export const BASE_URL = 'https://84f1ff8d5845.ngrok-free.app/api/v1';

export const ENDPOINTS = {
  getMedia: '/get-media',
  facebookLogin: '/facebook-login',
  facebookinsideLogin: '/facebook',
   media_Action: '/media-action',
  register: '/register',
  login: '/login',
  getProfile: '/get-profile',
  updateProfile: '/edit-profile/',
  updateProfilePicture: '/upload-profile/',
  getRewards: '/get-reward',
  getPoints: '/get-points-to-win',
  totalPoints: '/user-total-points',
  sendOtp: '/forgot-password',
  verifyOtp: '/verify-otp',
  allApprove: '/upload-all-post',
  purchaseRewards: '/purchase-reward',
  getHistory: '/reward-history/',
  pointTracking: '/point-tracking/',
  Leaderboard: '/top-user?type=',
  deleteAccount: '/delete-account',
  resetPassword: '/reset-password',
  autoApprovel: "/auto-approval/",
  youtubeLogin: "/youtube-login",
  appInsideYoutube: "/youtube-login-with-id",
  instagramLogin:"/instagram-login",
  instgraminsideLogin:"/instagram-login-user"
 

};
