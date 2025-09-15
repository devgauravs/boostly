import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteStack } from '../../../navigation/types';
import styles from './style';
import AuthScreenWrapper from '../AuthScreenWrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../../components/Input';

const OtpVerification = () => {
  const navigation = useNavigation<RouteStack>();
  const [otp, setOtp] = useState(['', '', '', '']);
  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  const handleVerify = () => {
    if (otp.includes('')) {
      Alert.alert('Please fill all OTP fields');
      return;
    }
    Alert.alert('OTP Submitted', `OTP: ${otp.join('')}`);
  };

  const handleResendOtp = () => {
    Alert.alert('Resend OTP', 'OTP has been resent to your phone number');
  };

  return (
    <AuthScreenWrapper>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.description}>
              Please enter the OTP (One-Time Password) sent to your registered
              phone number to complete your verification.
            </Text>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                // <TextInput
                //   key={index}
                //   style={styles.otpInput}
                //   value={digit}
                //   onChangeText={text => handleOtpChange(text, index)}
                //   keyboardType="numeric"
                //   maxLength={1}
                // />
                 <Input
            keyboardType="email-address"
            style={styles.otpInput}
            borderRadius={3}
          />
              ))}
            </View>

            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={styles.resendText}>Didn't Get The Code? Resend</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerify}
            >
              <Text style={styles.verifyText}>Verify</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AuthScreenWrapper>
  );
};

export default OtpVerification;
