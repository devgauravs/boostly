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
import InstagramIcon from '../../../assets/icons/instagram.png';
import FacebookIcon from '../../../assets/icons/facebook.png';
import YoutubeIcon from '../../../assets/icons/youtube.png';
import styles from './style';
import Container from '../../../components/Container';
import Input from '../../../components/Input';
import Storage, { StorageKeys } from '../../../utils/storage';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { setToken } from '../../../redux/AuthSlice';
import { useDispatch } from 'react-redux';
import { Logo } from '../../../assets/images';
import CountryPicker from '../../../components/CountryPicker';

const SignIn = () => {
  const navigation = useNavigation<RouteStack>();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const token = 'user_token@123';

  const handleSignIn = () => {
    Storage.setItem(StorageKeys.USER_TOKEN, token);
  };
  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
        'pages_show_list',
        'pages_read_engagement',
        'pages_manage_posts',
        'pages_read_user_content',
      ]);

      if (result.isCancelled) {
        Alert.alert('Login cancelled by user');
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        Alert.alert('Error', 'Unable to get Facebook access token');
        return;
      }

      dispatch(setToken(data.accessToken.toString()));
      Alert.alert('✅ Facebook Login Success', data.accessToken.toString());
    } catch (error: any) {
      Alert.alert('❌ Facebook Login Error', error?.message || String(error));
    }
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
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Sign In</Text>

        <Input
          suffix={
            <CountryPicker
            // onSelectCountry={handleChange("countryCode")}
            />
          }
          label="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          maxLength={15}
          placeholder="000-000"
        />
        <View style={{ marginTop: 12 }} />
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

        <Button title="Sign In" onPress={handleSignIn} style={styles.button} />

        <View style={styles.iconContainer}>
          <Image source={InstagramIcon} style={styles.icon} />
          <TouchableOpacity onPress={handleFacebookLogin}>
            <Image source={FacebookIcon} style={styles.icon} />
          </TouchableOpacity>
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
