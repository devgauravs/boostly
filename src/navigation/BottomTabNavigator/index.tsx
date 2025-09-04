import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/MainScreens/Home/HomeScreen';
import RewardScreen from '../../screens/MainScreens/Rewards/RewardScreen';
import ProfileScreen from '../../screens/MainScreens/Profile/ProfileScreen'; // Import Profile Screen

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Rewards"
        component={RewardScreen}
        options={{ title: 'Rewards' }}
      />
      <Tab.Screen
        name="Profile" // Add Profile Tab
        component={ProfileScreen} // ProfileScreen component
        options={{ title: 'Profile' }} // Tab label
      />
    </Tab.Navigator>
  );
}
