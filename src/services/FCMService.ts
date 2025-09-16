// src/services/FCMService.ts
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { store } from '../redux/store';
import { setFCMToken } from '../redux/AuthSlice';
import { NotificationService } from './NotificationService';

export class FCMService {
  /**
   * Get detailed Firebase status for debugging
   */
  static getFirebaseStatus(): {
    hasApps: boolean;
    appsCount: number;
    messagingAvailable: boolean;
    error?: string;
  } {
    try {
      const appsCount = firebase.apps.length;
      const hasApps = appsCount > 0;

      let messagingAvailable = false;
      let error;

      if (hasApps) {
        try {
          messaging();
          messagingAvailable = true;
        } catch (msgError: any) {
          error = msgError.message;
        }
      }

      return {
        hasApps,
        appsCount,
        messagingAvailable,
        error,
      };
    } catch (error: any) {
      return {
        hasApps: false,
        appsCount: 0,
        messagingAvailable: false,
        error: error.message,
      };
    }
  }

  /**
   * Check if Firebase is properly initialized
   */
  static isFirebaseInitialized(): boolean {
    const status = this.getFirebaseStatus();

    if (!status.hasApps) {
      console.log('❌ No Firebase apps found. Config files may be missing.');
      console.log(
        '📝 Add google-services.json (Android) and GoogleService-Info.plist (iOS)',
      );
      return false;
    }

    if (!status.messagingAvailable) {
      console.log('❌ Firebase messaging unavailable:', status.error);
      return false;
    }

    console.log('✅ Firebase initialized with', status.appsCount, 'app(s)');
    return true;
  }

  /**
   * Get FCM token from Firebase
   */
  static async getToken(): Promise<string | null> {
    try {
      if (!this.isFirebaseInitialized()) {
        console.warn(
          'Firebase is not initialized. Please add Firebase configuration files.',
        );
        return null;
      }

      const token = await messaging().getToken();
      console.log('FCM Token retrieved:', token);
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  /**
   * Initialize FCM token and set up token refresh listener
   */
  static async initialize(): Promise<void> {
    try {
      if (!this.isFirebaseInitialized()) {
        console.warn('Firebase not initialized. Skipping FCM initialization.');
        return;
      }

      // Initialize NotificationService first (handles permissions, channels, etc.)
      await NotificationService.initialize();

      // Get initial token
      const token = await this.getToken();
      if (token) {
        store.dispatch(setFCMToken(token));
      }

      // Listen for token refresh
      messaging().onTokenRefresh(newToken => {
        console.log('FCM Token refreshed:', newToken);
        store.dispatch(setFCMToken(newToken));
      });

      console.log(
        '✅ FCM Service initialized with NotificationService integration',
      );
    } catch (error) {
      console.error('Error initializing FCM service:', error);
    }
  }

  /**
   * Get current FCM token from Redux store
   */
  static getCurrentToken(): string | null {
    const state = store.getState();
    return state.auth.fcmToken;
  }

  /**
   * Refresh FCM token manually
   */
  static async refreshToken(): Promise<string | null> {
    try {
      if (!this.isFirebaseInitialized()) {
        console.warn('Firebase not initialized. Cannot refresh FCM token.');
        return null;
      }

      await messaging().deleteToken();
      const newToken = await this.getToken();
      if (newToken) {
        store.dispatch(setFCMToken(newToken));
      }
      return newToken;
    } catch (error) {
      console.error('Error refreshing FCM token:', error);
      return null;
    }
  }

  /**
   * Send a local notification
   */
  static async sendLocalNotification(
    title: string,
    body: string,
    data?: any,
  ): Promise<void> {
    return NotificationService.sendLocalNotification(title, body, data);
  }
}
