
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RewardScreen from '../screens/MainScreens/Rewards/RewardScreen';
import Leaderboard from '../screens/MainScreens/Leaderboard/Leaderboard';


const Stack = createNativeStackNavigator();

export const RewardsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RewardMain" component={RewardScreen} />
      <Stack.Screen name="LeaderBoard" component={Leaderboard} />
    </Stack.Navigator>
  );
};
