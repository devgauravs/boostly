// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import RootNavigator from './src/navigation';
import { persistor, store } from './src/redux/store';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/Toast/Toast';
import { ActivityIndicator } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size="large" color="#0000ff" />} 
        persistor={persistor}
      >
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </PersistGate>
    </Provider>
  );
};

export default App;