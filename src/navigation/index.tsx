// src/navigation/RootNavigator.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
import { BottomTabNavigator } from './BottomTabNavigator';
import { AuthNavigator } from './AuthNavigation/index';
import { requestNotificationPermission } from '../utils/permissions';
import { FCMService } from '../services/FCMService';
const RootNavigator: React.FC = () => {
  const { token, _persist, fcmToken } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    const setupNotifications = async () => {
      // Log Firebase status for debugging
      const firebaseStatus = FCMService.getFirebaseStatus();
      console.log('🔍 Firebase Status:', firebaseStatus);

      const granted = await requestNotificationPermission();
      if (granted && !fcmToken) {
        await FCMService.initialize();
      }
    };

    setupNotifications();
  }, [fcmToken]);

  if (!_persist?.rehydrated) {
    return null;
  }

  return token ? <BottomTabNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
