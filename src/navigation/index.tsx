// src/navigation/RootNavigator.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
import { BottomTabNavigator } from './BottomTabNavigator';
import { AuthNavigator } from './AuthNavigation/index';



const RootNavigator: React.FC = () => {
  // This selector will work because RootNavigator is rendered inside Provider
  // const token = useSelector((state: RootState) => state.auth.token);
  const token = "slkjfdskljfsdkljsdfjkl";

  // you can also check for loading/rehydrated state here if using redux-persist
  return token ? <BottomTabNavigator /> : <AuthNavigator />;
  // return(
  //   <>
  //   <BottomTabNavigator/>
  //   </>
  // )
};

export default RootNavigator;
