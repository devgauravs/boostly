import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteStack } from '../../../navigation/types';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import styles from './style';
import Container from '../../../components/Container';

const ResetPassword = () => {
  const navigation = useNavigation<RouteStack>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Please fill in both password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Passwords don't match!");
      return;
    }

    Alert.alert('Password Reset Successful!');
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

        <Button title="Reset Password" onPress={handleResetPassword} />
      </ScrollView>
    </Container>
  );
};

export default ResetPassword;
