// src/services/NotificationExamples.ts
import { FCMService } from './FCMService';

export class NotificationExamples {
  /**
   * Test local notification
   */
  static async sendTestNotification() {
    await FCMService.sendLocalNotification(
      'Test Notification',
      'This is a test notification from your app',
      { screen: 'Home' },
    );
  }

  /**
   * Get FCM token for backend
   */
  static getFCMToken(): string | null {
    return FCMService.getCurrentToken();
  }
}

/*
BACKEND NOTIFICATION FORMAT:

Send FCM messages to user's token in this format:

{
  "to": "USER_FCM_TOKEN",
  "notification": {
    "title": "Your Title",
    "body": "Your message"
  },
  "data": {
    "screen": "Home"
  }
}

Usage:
- NotificationExamples.sendTestNotification(); // Test local notification
- const token = NotificationExamples.getFCMToken(); // Get user's FCM token for backend
*/
