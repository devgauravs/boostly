import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import Button from '../../../components/Button';
import styles from './style';
import Input from '../../../components/Input';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthScreenWrapper from '../AuthScreenWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { verifyOtp } from '../../../redux/AuthSlice';
import Toast from 'react-native-toast-message';

const ForgotPassword = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleForgotPassword = async () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your email',
      });
      return;
    }
    try {
      await dispatch(verifyOtp(email)).unwrap(); 
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'OTP sent to your email',
      });
      navigation.navigate("OtpVerification")
    } catch (error) {
      console.log('OTP verification error:', error);
    }
  };

  return (
    <AuthScreenWrapper>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >

          <Text style={styles.ForgotLable}>Forgot Password</Text>
          {/*  Custom Input for Email */}
          <Input
            label="Email ID"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter your Email id"
          />

          {/*  Submit Button */}
          <Button title="Submit" onPress={handleForgotPassword} loading={isLoading}/>

        </ScrollView>
      </SafeAreaView>
    </AuthScreenWrapper>
  );
};

export default ForgotPassword;
