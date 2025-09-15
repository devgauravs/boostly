export interface Reward {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  price: number;
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

export interface PointsResponse {
  success: boolean;
  count: number;
  data: PointsResponseData[];
}

export interface PointsResponseData {
  _id: string;
  title: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TotalPointsResponse {
  success: boolean;
  userId: string;
  type: string;
  verifiedPoints: number;
  pendingPoints: number;
  totalWithPending: number;
}
