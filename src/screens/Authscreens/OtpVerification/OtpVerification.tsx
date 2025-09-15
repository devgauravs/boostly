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
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteStack } from '../../../navigation/types';
import styles from './style';
import AuthScreenWrapper from '../AuthScreenWrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { OtpInput } from 'react-native-otp-entry';
import { horizontalScale, verticalScale } from '../../../utils/scale';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { verifyOtp } from '../../../redux/AuthSlice';

const OtpVerification = () => {
  const navigation = useNavigation<RouteStack>();
    const dispatch = useDispatch<AppDispatch>();
  const [otp, setOtp] = useState('');
  const route = useRoute();
    const { email } = route.params;

  const handleVerify = async () => {
   if (!otp) {
       Toast.show({
         type: 'error',
         text1: 'Error',
         text2: 'Please enter your otp',
       });
       return;
     }
     try {
       await dispatch(verifyOtp(otp,email)).unwrap(); 
       Toast.show({
         type: 'success',
         text1: 'Success',
         text2: 'OTP sent to your otp',
       });
       navigation.navigate("ResetPassword")
     } catch (error) {
       console.log('OTP verification error:', error);
     }
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
              <OtpInput
                numberOfDigits={4}
                onTextChange={setOtp}
                onFilled={code => {
                  console.log('OTP filled:', code);
                }}
                theme={{
                  containerStyle: { marginBottom: 20 },
                  pinCodeContainerStyle: {
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: '#163A97',
                    width: horizontalScale(45),
                    height: verticalScale(45),
                    margin: 5,
                  },
                  pinCodeTextStyle: { fontSize: 18, color: '#000' },
                }}
              />
            </View>

            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={styles.resendText}>Didn't Get The Code? Resend</Text>
            </TouchableOpacity>

            <Button title="Verify" onPress={handleVerify} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AuthScreenWrapper>
  );
};

export default OtpVerification;
