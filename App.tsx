// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from './src/navigation';
import { store, persistor } from './src/redux/store';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/Toast/Toast';
import { ActivityIndicator } from 'react-native';


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;