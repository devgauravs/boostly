import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button';
import Container from '../../../components/Container';
import Input from '../../../components/Input';
import { MainStackProps, RouteStack } from '../../../navigation/types';
import { resetPassword } from '../../../redux/AuthSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import styles from './style';
import { RouteNames } from '../../../navigation/routeNames';

const ResetPassword = () => {
  const navigation = useNavigation<RouteStack>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      Toast.show({
        text1: 'Error',
        text2: 'Please fill in both password fields',
        type: 'error',
        visibilityTime: 3000,
      });

      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        text1: 'Error',
        text2: `Passwords don't match`,
        type: 'error',
        visibilityTime: 3000,
      });

      return;
    }
    dispatch(
      resetPassword({
        newPassword,
        confirmPassword,
      }),
    );
    navigation.reset({
      index: 0,
      routes: [{ name: RouteNames.SignIn as keyof MainStackProps }],
    });
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Reset Password</Text>

        <Input
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          placeholder="Enter your new password"
        />

        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Confirm your new password"
        />

        <Button
          title="Reset Password"
          onPress={handleResetPassword}
          style={{ marginTop: 20 }}
          loading={isLoading}
          disabled={isLoading}
        />
      </ScrollView>
    </Container>
  );
};

export default ResetPassword;
