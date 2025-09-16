import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import HomeScreen from '../../screens/MainScreens/Home/HomeScreen';
import ProfileScreen from '../../screens/MainScreens/Profile/ProfileScreen';

// 👇 Local icons
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeIcon from '../../assets/icons/home.png';
import NotificationIcon from '../../assets/icons/notification.png';
import RewardIcon from '../../assets/icons/trophy.png';
import { leftArrow, SettingsIcon } from '../../assets/images';
import Notification from '../../screens/MainScreens/Notification/Notification';
import Settings from '../../screens/MainScreens/Settings/Settings';
import Colors from '../../utils/color';
import { Fonts } from '../../utils/Fonts';
import { horizontalScale, verticalScale } from '../../utils/scale';
import { RewardsStack } from '../RewardsStack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTab() {
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
          paddingTop: verticalScale(5),
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
          } else if (route.name === 'Settings') {
            iconSource = SettingsIcon;
          } else if (route.name === 'Notifications') {
            iconSource = NotificationIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: horizontalScale(20),
                height: verticalScale(22),
                tintColor: focused ? Colors.primaryBlue : Colors.primaryBlack,
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
      <Tab.Screen
        name="Rewards"
        component={RewardsStack}
        options={{ title: 'Reward' }}
      />

      <Tab.Screen
        name="Notifications"
        component={Notification}
        options={{ title: 'Notifications' }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

export function BottomTabNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen
          options={{
            headerShown: false,
            // headerTitle: 'Profile',
            // headerTitleStyle: { fontFamily: Fonts.SemiBold },
            // headerShadowVisible: false,
            // headerLeft: ({ canGoBack }) => {
            //   const navigation = useNavigation();
            //   return (
            //     <Pressable
            //       onPress={() => navigation.goBack()}
            //       style={{ padding: 10 }}
            //     >
            //       <Image
            //         style={{ width: 20, height: 20 }}
            //         source={leftArrow}
            //         tintColor={Colors.primaryBlack}
            //       />
            //     </Pressable>
            //   );
            // },
          }}
          name="ProfileScreen"
          component={ProfileScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
