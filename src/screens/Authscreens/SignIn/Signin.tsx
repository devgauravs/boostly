// SignIn.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { RouteStack } from '../../../navigation/types';
import { LOGO } from '../../../assets/images';
import InstagramIcon from '../../../assets/icons/instagram.png';
import FacebookIcon from '../../../assets/icons/facebook.png';
import YoutubeIcon from '../../../assets/icons/youtube.png';
import styles from './style';
import { RouteNames } from '../../../navigation/routeNames';
import Container from '../../../components/Container';

const SignIn = () => {
  const navigation = useNavigation<RouteStack>(); // Navigation hook
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!phone) {
      Alert.alert('Please enter your phone number');
      return;
    }
    if (!password) {
      Alert.alert('Please enter your password');
      return;
    }

    navigation.navigate(RouteNames.OtpVerification as any);
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <Container>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Image source={LOGO} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Sign In</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            maxLength={15}
            placeholder="000-000"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="Type here..."
            placeholderTextColor="#999"
          />
        </View>

        {/* Forgot Password Button */}
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <Button title="Sign In" onPress={handleSignIn} />

        <View style={styles.iconContainer}>
          <Image source={InstagramIcon} style={styles.icon} />
          <Image source={FacebookIcon} style={styles.icon} />
          <Image source={YoutubeIcon} style={styles.icon} />
        </View>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Terms & Conditions <Text style={styles.dot}>•</Text> Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
};

export default SignIn;
