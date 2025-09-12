
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RewardScreen from '../screens/MainScreens/Rewards/RewardScreen';
import Leaderboard from '../screens/MainScreens/Leaderboard/Leaderboard';
import EearningPoints from '../screens/MainScreens/EearningPoints/EearningPoints';
import RewardHistory from '../screens/MainScreens/RewardHistory/RewardHistory';


const Stack = createNativeStackNavigator();

export const RewardsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RewardMain" component={RewardScreen} />
      <Stack.Screen name="LeaderBoard" component={Leaderboard} />
      <Stack.Screen name="EarningPoints" component={EearningPoints} />
        <Stack.Screen name="RewardHistory" component={RewardHistory} />
    </Stack.Navigator>
  );
};
