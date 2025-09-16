// src/services/RewardsService/rewardService.ts
import apiClient from '../../utils/apiInterceptor';
import { ENDPOINTS } from '../../utils/api';
import {
  RewardsResponse,
  GetRewardsParams,
  PointsResponse,
  TotalPointsResponse,
} from './types';
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
      const response = await apiClient.get<PointsResponse>(
        ENDPOINTS.getPoints,
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
}

export class purchaseRewardsService {
  // Get rewards API call
  static async purchaseRewards(userId: string, rewardId: string): Promise<any> {
    try {
      const response = await apiClient.post<any>(
        ENDPOINTS.purchaseRewards,
        {
          userId,rewardId
        }
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
      const response = await apiClient.get<TotalPointsResponse>(endpoint);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
  

  
}
export class historyService {
  static async getHistory(userId: string): Promise<any> {
    const endpoint = `${ENDPOINTS.getHistory}${userId}`;
    try {
      const response = await apiClient.get<any>(endpoint);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
  

  
}

export class pointTrackingService {
  static async pointTracking(userId: string): Promise<any> {
    const endpoint = `${ENDPOINTS.pointTracking}${userId}`;
    try {
      const response = await apiClient.get<any>(endpoint);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
}

export class pointLeaderBoardService {
  static async pointLeaderBoard(userId: string): Promise<any> {
    const endpoint = `${ENDPOINTS.Leaderboard}${userId}`;
    try {
      const response = await apiClient.get<any>(endpoint);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
}