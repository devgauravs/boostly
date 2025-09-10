import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
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
import { loginUser } from '../../../redux/AuthSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { facebookLogin } from '../../../utils/AuthHelper';
import AuthScreenWrapper from '../AuthScreenWrapper';
import {
  validateAtLeastOneContact,
  validateEmail,
  validatePhone,
} from '../SignUp/validation';
import styles from './style';

const SignIn = () => {
  const navigation = useNavigation<RouteStack>();
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [selectedTab, setSelectedTab] = useState<'email' | 'phone'>('email');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [countryCode, setCountryCode] = useState('+1');
  const dispatch = useDispatch<AppDispatch>();

  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

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
      const contactValidationError = validateAtLeastOneContact(
        currentEmail,
        currentPhone,
        selectedTab,
      );
      if (contactValidationError) {
        setErrors({ inputValue: contactValidationError });
        return;
      }
      const emailError = validateEmail(currentEmail);
      const phoneError = validatePhone(currentPhone);
      if (emailError || phoneError) {
        setErrors({
          inputValue:
            selectedTab === 'email' ? emailError || '' : phoneError || '',
        });
        return;
      }
      if (!password) {
        setErrors({ password: 'Password is required' });
        return;
      }
      let payload;
      if (selectedTab === 'email') {
        payload = { email: currentEmail, password };
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
    facebookLogin(dispatch);
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
        secureText={true}
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
        <Image source={InstagramIcon} style={styles.icon} />
        <TouchableOpacity onPress={handleFacebookLogin} disabled={isLoading}>
          <Image source={FacebookIcon} style={styles.icon} />
        </TouchableOpacity>
        <Image source={YoutubeIcon} style={styles.icon} />
      </View>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('SignUp')}
        disabled={isLoading}
      >
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
    </AuthScreenWrapper>
  );
};

export default SignIn;
