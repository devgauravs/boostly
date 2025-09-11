// src/services/RewardsService/rewardService.ts
import apiClient from '../../utils/apiInterceptor';
import { ENDPOINTS } from '../../utils/api';
import { RewardsResponse, GetRewardsParams } from './types';

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
