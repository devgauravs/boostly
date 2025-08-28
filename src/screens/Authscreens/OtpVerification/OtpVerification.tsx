import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteStack } from '../../../navigation/types'; // Adjust according to your project structure
import styles from './style';

const OtpVerification = () => {
  const navigation = useNavigation<RouteStack>(); // Navigation hook
  const [otp, setOtp] = useState(['', '', '', '']); // State to store OTP inputs

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
    // Navigation to next screen after successful OTP verification
  };

  const handleResendOtp = () => {
    Alert.alert('Resend OTP', 'OTP has been resent to your phone number');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.description}>
            Please enter the OTP sent to your registered phone number to
            complete your verification.
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                value={digit}
                onChangeText={text => handleOtpChange(text, index)}
                keyboardType="numeric"
                maxLength={1}
              />
            ))}
          </View>

          <TouchableOpacity onPress={handleResendOtp}>
            <Text style={styles.resendText}>Didn't Get The Code? Resend</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
            <Text style={styles.verifyText}>Verify</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Terms & Conditions <Text style={styles.dot}>•</Text> Privacy
              Policy
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerification;
