// src/navigation/RootNavigator.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
import { BottomTabNavigator } from './BottomTabNavigator';
import { AuthNavigator } from './AuthNavigation/index';
import { requestNotificationPermission } from '../utils/permissions';
import messaging from '@react-native-firebase/messaging';
const RootNavigator: React.FC = () => {
  const { token, _persist } = useSelector((state: RootState) => state.auth);
 useEffect(() => {
    const setupNotifications = async () => {
      const granted = await requestNotificationPermission();
      if (granted) {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
      }
    };

    setupNotifications();
  }, []);

  if (!_persist?.rehydrated) {
    return null;
  }

  return token ? <BottomTabNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
