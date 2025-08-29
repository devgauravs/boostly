// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import styles from './style';

// const EmailVerification = () => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const handleOtpChange = (text: string, index: number) => {
//     const newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);
//   };

//   const handleVerify = () => {
//     if (otp.includes('')) {
//       alert('Please fill all OTP fields');
//       return;
//     }
//     alert('OTP Submitted: ' + otp.join(''));
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           keyboardShouldPersistTaps="handled"
//         >
//           {/* Logo */}
//           <Image
//             source={require('../../../assets/images/logo.png')}
//             style={styles.logo}
//             resizeMode="contain"
//           />

//           {/* Title and description */}
//           <Text style={styles.title}>Verify Your Account!</Text>
//           <Text style={styles.description}>
//             We send a code to your email
//             {'\n'}user@gmail.com
//           </Text>

//           {/* OTP Inputs */}
//           <View style={styles.otpContainer}>
//             {otp.map((digit, index) => (
//               <TextInput
//                 key={index}
//                 style={styles.otpInput}
//                 value={digit}
//                 onChangeText={text => handleOtpChange(text, index)}
//                 keyboardType="numeric"
//                 maxLength={1}
//               />
//             ))}
//           </View>

//           {/* Continue Button */}
//           <TouchableOpacity
//             style={styles.continueButton}
//             onPress={handleVerify}
//           >
//             <Text style={styles.continueText}>Continue</Text>
//           </TouchableOpacity>

//           {/* Footer */}
//           <Text style={styles.footerText}>
//             Terms & Conditions <Text style={styles.dot}>•</Text> Privacy Policy
//           </Text>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default EmailVerification;
// function alert(arg0: string) {
//   throw new Error('Function not implemented.');
// }

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteStack } from '../../../navigation/types';
import styles from './style';
import { RouteNames } from '../../../navigation/routeNames';

const EmailVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const navigation = useNavigation<RouteStack>();

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

    Alert.alert('OTP Submitted: ' + otp.join(''));
    // Navigate to ResetPassword screen
    navigation.navigate(RouteNames.ResetPassword as any);
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
          <Text style={styles.title}>Verify Your Account!</Text>
          <Text style={styles.description}>
            We sent a code to your email{'\n'}user@gmail.com
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

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleVerify}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Terms & Conditions <Text style={styles.dot}>•</Text> Privacy Policy
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EmailVerification;
