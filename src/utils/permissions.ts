import { Platform, PermissionsAndroid } from 'react-native';

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if (!hasPermission) {
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
     
        );
        return status === PermissionsAndroid.RESULTS.GRANTED;
      }

      return true; // already granted
    } catch (err) {
      console.log('Notification Permission Error:', err);
      return false;
    }
  }

  // iOS handled separately (via Firebase messaging.requestPermission)
  return true;
};
