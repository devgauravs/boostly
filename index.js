/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// Firebase will auto-initialize if config files are present
// No manual initialization needed


AppRegistry.registerComponent(appName, () => App);
