// src/navigation/RootNavigator.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
import { BottomTabNavigator } from './BottomTabNavigator';
import { AuthNavigator } from './AuthNavigation/index';

const RootNavigator: React.FC = () => {
  const { token, _persist } = useSelector((state: RootState) => state.auth);

  if (!_persist?.rehydrated) {
    return null;
  }

  return token ? <BottomTabNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
