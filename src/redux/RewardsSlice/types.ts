import { Reward } from '../../services/RewardsService/types';

export interface RewardsState {
  rewards: Reward[];
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  hasMore: boolean;
}
