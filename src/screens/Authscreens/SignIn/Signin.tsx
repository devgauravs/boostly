import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import FacebookIcon from '../../../assets/icons/facebook.png';
import InstagramIcon from '../../../assets/icons/instagram.png';
import YoutubeIcon from '../../../assets/icons/youtube.png';
import Button from '../../../components/Button';
import CountryPicker from '../../../components/CountryPicker';
import Input from '../../../components/Input';
import { RouteStack } from '../../../navigation/types';
import { loginUser, setToken } from '../../../redux/AuthSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { facebookLogin, youtubeLogin } from '../../../utils/AuthHelper';
import AuthScreenWrapper from '../AuthScreenWrapper';
import InstagramLogin from 'react-native-instagram-login';

import {
  validateAtLeastOneContact,
  validateEmail,
  validatePhone,
} from '../SignUp/validation';
import styles from './style';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const SignIn = () => {
  const navigation = useNavigation<RouteStack>();
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [selectedTab, setSelectedTab] = useState<'email' | 'phone'>('email');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [countryCode, setCountryCode] = useState('+1');
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const instagramRef = useRef<InstagramLogin>(null);
  console.log('instagramRef=>', instagramRef);

  const onInstagramSuccess = (token: string) => {
    console.log('✅ Instagram AccessToken:', token);

    // Save in Redux (frontend only)
    dispatch(setToken(token));
    // dispatch(setUser({ instagramUser: true })); // optional placeholder
    Toast.show({
      type: 'success',
      text1: 'Instagram Login Successful',
      text2: 'Token saved locally.',
    });
  };

  const onInstagramFailure = (data: any) => {
    console.log('❌ Instagram Login Failed:', data);
    Toast.show({
      type: 'error',
      text1: 'Instagram Login Failed',
      text2: data?.message || 'Something went wrong.',
    });
  };

  const clearFields = () => {
    setPassword('');
    setErrors({});
    setCountryCode('+1');
    setInputValue('');
  };

  const handleSignIn = async () => {
    try {
      setErrors({});
      const currentEmail = selectedTab === 'email' ? inputValue : '';
      const currentPhone = selectedTab === 'phone' ? inputValue : '';

      // Collect all validation errors instead of early returns
      const validationErrors: { [key: string]: string } = {};

      // Check contact validation
      const contactValidationError = validateAtLeastOneContact(
        currentEmail,
        currentPhone,
        selectedTab,
      );
      if (contactValidationError) {
        validationErrors.inputValue = contactValidationError;
      } else {
        // Only check format if contact validation passed
        const emailError = validateEmail(currentEmail);
        const phoneError = validatePhone(currentPhone);

        if (selectedTab === 'email' && emailError) {
          validationErrors.inputValue = emailError;
        } else if (selectedTab === 'phone' && phoneError) {
          validationErrors.inputValue = phoneError;
        }
      }

      // Check password validation
      if (!password) {
        validationErrors.password = 'Password is required';
      }

      // If we have any validation errors, set them all and return
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // If all validations pass, proceed with login
      let payload;
      if (selectedTab === 'email') {
        payload = { email: currentEmail.toLowerCase(), password };
      } else {
        payload = { phoneNumber: currentPhone, countryCode, password };
      }
      dispatch(loginUser(payload));
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An unexpected error occurred',
      });
    }
  };

  const handleFacebookLogin = () => {
    facebookLogin(dispatch, user?._id);
  };
   const handleYouTubeLogin = () => {
    youtubeLogin(dispatch);
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <AuthScreenWrapper heading={'Sign In'}>
      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, selectedTab === 'email' && styles.activeTab]}
          onPress={() => {
            setSelectedTab('email');
            clearFields();
          }}
          disabled={isLoading}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'email' && styles.activeTabText,
            ]}
          >
            Email
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, selectedTab === 'phone' && styles.activeTab]}
          onPress={() => {
            setSelectedTab('phone');
            clearFields();
          }}
          disabled={isLoading}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'phone' && styles.activeTabText,
            ]}
          >
            Phone
          </Text>
        </Pressable>
      </View>

      <Input
        suffix={
          selectedTab === 'phone' ? (
            <CountryPicker
              onSelectCountry={dialCode => {
                setCountryCode(dialCode);
              }}
            />
          ) : undefined
        }
        label={selectedTab === 'phone' ? 'Phone Number' : 'Email Address'}
        keyboardType={selectedTab === 'phone' ? 'phone-pad' : 'email-address'}
        value={inputValue}
        onChangeText={text => {
          setInputValue(text);
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.inputValue;
            return newErrors;
          });
        }}
        maxLength={selectedTab === 'phone' ? 15 : undefined}
        placeholder={
          selectedTab === 'phone' ? '000-000-0000' : 'Enter your email'
        }
        error={errors.inputValue}
      />
      <View style={{ marginTop: 12 }} />
      <Input
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={text => {
          setPassword(text);
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.password;
            return newErrors;
          });
        }}
        placeholder="Password"
        error={errors.password}
      />

      <TouchableOpacity onPress={handleForgotPassword} disabled={isLoading}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <Button
        title={'Sign In'}
        onPress={handleSignIn}
        style={styles.button}
        disabled={isLoading}
        loading={isLoading}
      />

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => instagramRef.current?.show()}>
          <Image source={InstagramIcon} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFacebookLogin} disabled={isLoading}>
          <Image source={FacebookIcon} style={styles.icon} />
        </TouchableOpacity>
      <TouchableOpacity onPress={handleYouTubeLogin}>
        <Image source={YoutubeIcon} style={styles.icon} />
      </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('SignUp')}
        disabled={isLoading}
      >
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
      <InstagramLogin
        ref={instagramRef}
        appId="1313530670259714"
        appSecret="b5afe909fee33c821d4b967699cb8e74"
        redirectUrl="boostlyapp://auth/"
        scopes={['user_profile', 'user_media']}
        onLoginSuccess={onInstagramSuccess}
        onLoginFailure={onInstagramFailure}
      />
    </AuthScreenWrapper>
  );
};

export default SignIn;
