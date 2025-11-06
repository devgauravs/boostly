// src/utils/apiInterceptor.ts
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Alert } from 'react-native';
import Storage, { StorageKeys } from './storage';

// Static base URL for now
const BASE_URL = 'https://48510d47d65c.ngrok-free.app/api/v1';

// Create axios instance
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  async config => {
    try {
      const token = await Storage.getItem(StorageKeys.USER_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('Error getting token:', error);
    }

    if (__DEV__) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (__DEV__) {
      console.log('📥 API Response:', {
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  async (error: AxiosError) => {
    if (__DEV__) {
      console.log(
        '❌ API Error:',
        { error },
        error.response?.status,
        error.response?.data,
      );
    }

    const status = error.response?.status;
    const data = error.response?.data as any;

    switch (status) {
      case 401:
        await Storage.removeItem(StorageKeys.USER_TOKEN);
        Alert.alert('Session Expired', 'Please log in again.');
        break;
      case 403:
        Alert.alert('Access Denied', data?.message || 'Permission denied.');
        break;
      case 500:
        Alert.alert('Server Error', 'Something went wrong. Please try again.');
        break;
    }

    return Promise.reject(error);
  },
);

export default apiClient;
