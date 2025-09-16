// src/services/NotificationService.ts
import notifee, { AndroidImportance } from '@notifee/react-native';
import { getApp } from '@react-native-firebase/app';
import {
  AuthorizationStatus,
  getMessaging,
} from '@react-native-firebase/messaging';

const messaging = getMessaging(getApp());

class NotificationService {
  static async getToken(): Promise<string> {
    try {
      const authStatus = await messaging.requestPermission();
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging.getToken();
        return token;
      }
      return '';
    } catch (err) {
      throw err;
    }
  }

  static createChannel() {
    notifee.createChannel({
      id: 'default',
      name: 'Boostly Notifications',
      importance: AndroidImportance.HIGH,
    });
  }

  static async localNotification(title: string, body: string) {
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: 'default',
        smallIcon: 'ic_notification',
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  static async sendNotification() {
    messaging.onMessage(remoteMessage => {
      const title = remoteMessage.notification?.title ?? 'Boostly';
      const body = remoteMessage.notification?.body ?? '';
      this.localNotification(title, body);
    });
  }
}

export default NotificationService;
