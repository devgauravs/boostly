// src/services/NotificationService.ts
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { Platform } from 'react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

export class NotificationService {
  /**
   * Initialize notification service
   */
  static async initialize(): Promise<void> {
    try {
      // Request permissions
      await this.requestPermissions();

      // Create notification channel for Android
      if (Platform.OS === 'android') {
        await this.createChannel();
      }

      // Setup message handlers
      this.setupMessageHandlers();

      // Setup tap handlers
      this.setupTapHandlers();

      console.log('✅ Notification Service initialized');
    } catch (error) {
      console.error('❌ Error initializing notifications:', error);
    }
  }

  /**
   * Request permissions
   */
  static async requestPermissions(): Promise<boolean> {
    try {
      const settings = await notifee.requestPermission();
      return settings.authorizationStatus >= 1;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  }

  /**
   * Create notification channel for Android
   */
  private static async createChannel(): Promise<void> {
    await notifee.createChannel({
      id: 'default',
      name: 'Notifications',
      importance: AndroidImportance.HIGH,
    });
  }

  /**
   * Setup FCM message handlers
   */
  private static setupMessageHandlers(): void {
    // Background messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('📱 Background notification received');
      await this.showNotification(remoteMessage);
    });

    // Foreground messages
    messaging().onMessage(async remoteMessage => {
      console.log('📱 Foreground notification received');
      await this.showNotification(remoteMessage);
    });
  }

  /**
   * Setup notification tap handlers
   */
  private static setupTapHandlers(): void {
    // Foreground taps
    notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        this.handleTap(detail.notification?.data);
      }
    });

    // Background taps
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS) {
        this.handleTap(detail.notification?.data);
      }
    });
  }

  /**
   * Show notification
   */
  private static async showNotification(
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ): Promise<void> {
    const { notification, data } = remoteMessage;

    if (!notification?.title || !notification?.body) return;

    await notifee.displayNotification({
      title: notification.title,
      body: notification.body,
      data: data || {},
      android: {
        channelId: 'default',
        smallIcon: 'ic_notification',
      },
    });
  }

  /**
   * Handle notification tap
   */
  private static handleTap(data: any): void {
    if (!data) return;

    console.log('📱 Notification tapped:', data);

    // Add your navigation logic here
    // Example: NavigationService.navigate(data.screen || 'Home');
  }

  /**
   * Send local notification (for testing)
   */
  static async sendLocalNotification(
    title: string,
    body: string,
    data?: any,
  ): Promise<void> {
    await notifee.displayNotification({
      title,
      body,
      data: data || {},
      android: {
        channelId: 'default',
        smallIcon: 'ic_notification',
      },
    });
  }
}
