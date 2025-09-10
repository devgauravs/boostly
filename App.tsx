// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import RootNavigator from './src/navigation';
import { store } from './src/redux/store';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/Toast/Toast';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;
