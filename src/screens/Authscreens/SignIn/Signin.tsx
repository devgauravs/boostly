// SignIn.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
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
import Input from '../../../components/Input';

const SignIn = () => {
  const navigation = useNavigation<RouteStack>();
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

        <Input
          label="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          maxLength={15}
          placeholder="000-000"
        />

        <Input
          label="Password"
          secureText={true}
          value={password}
          onChangeText={setPassword}
          placeholder="Type here..."
        />

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

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
