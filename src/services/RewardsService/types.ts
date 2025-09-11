export interface Reward {
  _id: string;
  title: string;
  description: string;
  points: number;
  category: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RewardsResponse {
  success: boolean;
  message: string;
  data: Reward[];
  totalCount?: number;
}

export interface GetRewardsParams {
  page?: number;
  limit?: number;
  category?: string;
  isActive?: boolean;
}
