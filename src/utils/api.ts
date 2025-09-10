// src/utils/api.ts
import apiClient from './apiInterceptor';

// Keep static URL inside component for now
export const BASE_URL = 'https://b5a625294f41.ngrok-free.app/api/v1';

export const ENDPOINTS = {
  getMedia: '/get-media',
  facebookLogin: '/facebook',
  register: '/register',
  login: '/login',
};
