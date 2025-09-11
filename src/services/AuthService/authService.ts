// src/services/authService.ts
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import apiClient from '../../utils/apiInterceptor';
import { ENDPOINTS } from '../../utils/api';
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  UpdateProfileParams,
} from './types';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        ENDPOINTS.login,
        credentials,
      );
      return response.data;
    } catch (error: any) {
      throw error.response;
    }
  }

  // Register API call
  static async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        ENDPOINTS.register,
        userData,
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
  // Register API call
  static async updateProfile(
    userId: string,
    userData: UpdateProfileParams,
  ): Promise<AuthResponse> {
    try {
      console.log('userif', userId);
      console.log('data', userData);

      const response = await apiClient.put<AuthResponse>(
        `${ENDPOINTS.updateProfile}${userId}`,
        userData,
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  // Facebook login - get access token
  static async getFacebookToken(): Promise<string> {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'pages_show_list',
      'pages_read_engagement',
      'pages_manage_posts',
      'pages_read_user_content',
    ]);

    if (result.isCancelled) {
      throw new Error('Login cancelled by user');
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw new Error('Unable to get Facebook access token');
    }

    return data.accessToken.toString();
  }

  // Facebook login API call
  static async facebookLogin(facebookToken: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        ENDPOINTS.facebookLogin,
        {
          accessToken: facebookToken,
        },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Facebook login failed');
    }
  }

  // Get user media
  static async getUserMedia(params?: any): Promise<any> {
    try {
      const response = await apiClient.get(ENDPOINTS.getMedia, params);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get user media');
    }
  }

  // Get user profile
  static async getProfile(userId: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.get<AuthResponse>(
        `${ENDPOINTS.getProfile}/${userId}`,
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get user profile');
    }
  }
}
