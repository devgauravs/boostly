import {
  PointsResponseData,
  Reward,
  TotalPointsResponse,
} from '../../services/RewardsService/types';

export interface RewardsState {
  rewards: Reward[];
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  hasMore: boolean;
  points: PointsResponseData[];
  totalPoints: any;
  history:any;
  pointTracking:any;
  leaderboard:any;
}
