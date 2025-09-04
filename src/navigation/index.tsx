import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AuthNavigator } from './AuthNavigation';
import { BottomTabNavigator } from './BottomTabNavigator/index';
import Storage, { StorageKeys } from '../utils/storage';

export const RootNavigator = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await Storage.getItem(StorageKeys.USER_TOKEN);
        setToken(storedToken);
      } catch (e) {
        console.error('Failed to load token', e);
      }
    };

    fetchToken();
  }, []);
  return <>{!token ? <AuthNavigator /> : <BottomTabNavigator />}</>;
};
