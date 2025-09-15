import axios from 'axios';
import { BASE_URL, ENDPOINTS } from './api';

export const getReward = async (token: string) => {
  try {
    const response = await axios.get(
      `https://a6364843ce24.ngrok-free.app/api/v1/get-reward`,
      {},
    );
    return response.data;
  } catch (error) {
    console.error('Get Reward API Error:', error);
    throw error;
  }
};
