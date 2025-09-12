import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import HomeScreen from '../../screens/MainScreens/Home/HomeScreen';
import RewardScreen from '../../screens/MainScreens/Rewards/RewardScreen';
import ProfileScreen from '../../screens/MainScreens/Profile/ProfileScreen';

// 👇 Local icons
import HomeIcon from '../../assets/icons/home.png';
import RewardIcon from '../../assets/icons/trophy.png';
import ProfileIcon from '../../assets/icons/profile.png';
import NotificationIcon from '../../assets/icons/notification.png';
import Colors from '../../utils/color';
import { horizontalScale, verticalScale } from '../../utils/scale';
import Notification from '../../screens/MainScreens/Notification/Notification';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RewardsStack } from '../RewardsStack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: verticalScale(60),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden', 
          position: 'absolute',
          paddingTop:verticalScale(5)
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={['#1c20ddff', '#2861ddff']}
            style={{ flex: 1 }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.lightgray,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingBottom: 80,
              }}
            />
          </LinearGradient>
        ),
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = HomeIcon;
          } else if (route.name === 'Rewards') {
            iconSource = RewardIcon;
          } else if (route.name === 'Profile') {
            iconSource = ProfileIcon;
          } else if (route.name === 'Notifications') {
            iconSource = NotificationIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: horizontalScale(20),
                height: verticalScale(22),
                tintColor: focused ? Colors.primaryBlue: Colors.primaryBlack,
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#1c20ddff',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
       <Tab.Screen name="Rewards" component={RewardsStack} options={{ title: 'Reward' }} />

      <Tab.Screen
        name="Notifications"
        component={Notification}
        options={{ title: 'Notifications' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}
