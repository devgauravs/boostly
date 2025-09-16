// src/redux/RewardsSlice/RewardsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { historyService, pointLeaderBoardService, pointService, pointTrackingService, purchaseRewardsService, RewardsService, totalPointsService } from '../../services/RewardsService/rewardService';
import { GetRewardsParams } from '../../services/RewardsService/types';
import { RewardsState } from './types';
import Toast from 'react-native-toast-message';


const initialState: RewardsState = {
  rewards: [],
  isLoading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  hasMore: true,
  points: [],
  totalPoints: {},
  history: [],
  pointTracking: {},
  leaderboard: [],

};

// Async thunk for fetching rewards
export const fetchRewards = createAsyncThunk(
  'rewards/fetchRewards',
  async (params: GetRewardsParams = {}, { rejectWithValue }) => {
    try {
      const response = await RewardsService.getRewards(params);
      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to fetch rewards';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      return rejectWithValue(message);
    }
  },
);

export const fetchPoints = createAsyncThunk(
  'rewards/fetchPoints',
  async () => {
    try {
      const response = await pointService.getPoints();
      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to fetch Points';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });

    }
  },
);

interface PurchaseRewardsPayload {
  userId: string;
  rewardId: string;
}

export const purchaseRewards = createAsyncThunk(
  "rewards/purchaseRewards",
  async ({ userId, rewardId }: PurchaseRewardsPayload, thunkAPI) => {
    console.log("userId==>", userId)
    console.log("rewardId", rewardId)
    try {
      const response = await purchaseRewardsService.purchaseRewards(userId, rewardId);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Reward purchased successfully 🎉",
      });
      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch Points";

      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
      });

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const fetchTotalPoints = createAsyncThunk(
  'rewards/fetchTotalPoints',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await totalPointsService.getTotalPoints(userId);
      console.log("responseofTotalPoints==>", response)
      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to fetch Points';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      return rejectWithValue(message);
    }
  },
);
export const fetchHistory = createAsyncThunk(
  'rewards/fetchHistory',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await historyService.getHistory(userId);
      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to fetch History';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      return rejectWithValue(message);
    }
  },
);

export const fetchPointTracking = createAsyncThunk(
  'rewards/pointTracking',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await pointTrackingService.pointTracking(userId);
      return response;
    } catch (error: any) {
      console.log("error", error)
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to fetch History';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      return rejectWithValue(message);
    }
  },
);
export const fetchLeaderBoard = createAsyncThunk(
  'rewards/fetchLeaderBoard',
  async (
    period: '7days' | '30days' | 'alltime',
    { rejectWithValue }
  ) => {
    try {
      const response = await pointLeaderBoardService.pointLeaderBoard(period);
      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to fetch Leaderboard';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      return rejectWithValue(message);
    }
  }
);

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Fetch Rewards
    builder
      .addCase(fetchRewards.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRewards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rewards = action.payload.data;
        state.totalCount =
          action.payload.totalCount || action.payload.data.length;
        state.error = null;
      })
      .addCase(fetchRewards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPoints.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPoints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.points = action.payload.data;
        state.error = null;
      })
      .addCase(fetchTotalPoints.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTotalPoints.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTotalPoints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalPoints = action.payload;
        state.error = null;
      })
      // 👉 Purchase Rewards
      .addCase(purchaseRewards.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(purchaseRewards.fulfilled, (state, action) => {
        state.isLoading = false;
        // you may want to update points or rewards list here if API returns it
        state.error = null;
      })
      .addCase(purchaseRewards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch History
      .addCase(fetchHistory.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.history = action.payload.data; // 👈 assuming API returns { data: [...] }
        state.error = null;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // 👉 Fetch Point Tracking
      .addCase(fetchPointTracking.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPointTracking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pointTracking = action.payload; // 👈 save response here
        state.error = null;
      })
      .addCase(fetchPointTracking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    // 👉 Fetch Leaderboard
    builder
      .addCase(fetchLeaderBoard.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLeaderBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leaderboard = action.payload.topTen;
        state.error = null;
      })
      .addCase(fetchLeaderBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});



export const { clearError } = rewardsSlice.actions;
export default rewardsSlice.reducer;
