import { verifyOtp } from '../redux/AuthSlice';

// src/utils/api.ts
export const BASE_URL = 'https://a6364843ce24.ngrok-free.app/api/v1';

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
  getPoints: '/get-points-to-win',
  totalPoints: '/user-total-points',
  sendOtp: '/forgot-password',
  verifyOtp: '/verify-otp',
  resetPassword: 'reset-password',
};
