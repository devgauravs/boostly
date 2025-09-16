import { verifyOtp } from '../redux/AuthSlice';
import { purchaseRewards } from '../redux/RewardsSlice/RewardsSlice';
import Leaderboard from '../screens/MainScreens/Leaderboard/Leaderboard';

// src/utils/api.ts
export const BASE_URL = 'https://595fc431e703.ngrok-free.app/api/v1';

export const ENDPOINTS = {
  getMedia: '/get-posts/',
  facebookLogin: '/facebook-login',
  facebookinsideLogin: '/facebook',
  media_Action: '/media-action',
  register: '/register',
  login: '/login',
  getProfile: '/get-profile',
  updateProfile: '/edit-profile/',
  getRewards: '/get-reward',
  getPoints:'/get-points-to-win',
  totalPoints:'/user-total-points',
  sendOtp:'/forgot-password',
  verifyOtp:"/verify-otp",
  allApprove:"/upload-all-post",
  purchaseRewards:"/purchase-reward",
  getHistory:"/reward-history/",
  pointTracking:"/point-tracking/",
  Leaderboard:"/top-user?type="
};
