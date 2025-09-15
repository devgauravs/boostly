// src/services/RewardsService/rewardService.ts
import apiClient from '../../utils/apiInterceptor';
import { ENDPOINTS } from '../../utils/api';
import { RewardsResponse, GetRewardsParams, PointsResponse, TotalPointsResponse } from './types';
import Toast from 'react-native-toast-message';

export class RewardsService {
  // Get rewards API call
  static async getRewards(params?: GetRewardsParams): Promise<RewardsResponse> {
    try {
      const response = await apiClient.get<RewardsResponse>(
        ENDPOINTS.getRewards,
        { params },
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
}

export class pointService {
  // Get rewards API call
  static async getPoints(): Promise<any> {
    try {
      const response = await apiClient.post<PointsResponse>(
        ENDPOINTS.getPoints,
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
}

export class totalPointsService {
  static async getTotalPoints(userId: string): Promise<TotalPointsResponse> {
    const endpoint = `${ENDPOINTS.totalPoints}/${userId}`;
    try {
      const response = await apiClient.get(endpoint);
      return response.data; 
    } catch (error: any) {
      throw error;
    }
  }
}