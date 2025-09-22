// src/navigation/RootNavigator.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
import { AuthNavigator } from './AuthNavigation/index';
import { requestNotificationPermission } from '../utils/permissions';
import { FCMService } from '../services/FCMService';
import NotificationService from '../services/NotificationService';
import { BottomTabNavigator } from './BottomTabNavigator';
const RootNavigator: React.FC = () => {
  const { token, _persist, fcmToken } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    const setupNotifications = async () => {
      const granted = await requestNotificationPermission();
      if (granted) {
        // Initialize NotificationService first (handles channels and message listening)
        NotificationService.createChannel();
        NotificationService.sendNotification();

        // Then initialize FCM for token management
        if (!fcmToken) {
          await FCMService.initialize();
        }
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
