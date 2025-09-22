// GoogleConfig.ts
import { Platform } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  if (Platform.OS === 'android') {
    GoogleSignin.configure({
      webClientId:
        '251510090854-jvpilnm00kqgdp0v47ud8l030mt93e89.apps.googleusercontent.com',
      offlineAccess: true,
//     scopes: [
//   'https://www.googleapis.com/auth/userinfo.profile',          // name, profile pic
//   'https://www.googleapis.com/auth/userinfo.email',            // email
//   'https://www.googleapis.com/auth/youtube.readonly',          // subscriptions, likes, playlists
//   'https://www.googleapis.com/auth/youtube.force-ssl',         // read/write actions
//   'https://www.googleapis.com/auth/youtube',                   // manage account (like, comment)
// ]
    });
  } else {
    GoogleSignin.configure({
      iosClientId:
        'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
      webClientId:
        '251510090854-jvpilnm00kqgdp0v47ud8l030mt93e89.apps.googleusercontent.com',
      offlineAccess: true,
    //   scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
    });
  }
};
