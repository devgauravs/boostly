// src/redux/RewardsSlice/RewardsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RewardsService } from '../../services/RewardsService/rewardService';
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
      });
  },
});

export const { clearError } = rewardsSlice.actions;
export default rewardsSlice.reducer;
