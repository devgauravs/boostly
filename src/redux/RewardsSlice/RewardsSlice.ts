// src/redux/RewardsSlice/RewardsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pointService, RewardsService, totalPointsService } from '../../services/RewardsService/rewardService';
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
  totalPoints:{}

  
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

export const fetchTotalPoints = createAsyncThunk(
  'rewards/fetchTotalPoints',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await totalPointsService.getTotalPoints(userId);
      console.log("responseofTotalPoints==>",response)
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
        console.log("acionnn",action.payload)
        state.isLoading = false;
        state.totalPoints = action.payload; 
        state.error = null;
      })
  },
});

export const { clearError } = rewardsSlice.actions;
export default rewardsSlice.reducer;
