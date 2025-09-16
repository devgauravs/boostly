/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Firebase will auto-initialize if config files are present
// No manual initialization needed

AppRegistry.registerComponent(appName, () => App);
