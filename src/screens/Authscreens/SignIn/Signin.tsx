import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import FacebookIcon from '../../../assets/icons/facebook.png';
import InstagramIcon from '../../../assets/icons/instagram.png';
import YoutubeIcon from '../../../assets/icons/youtube.png';
import Button from '../../../components/Button';
import CountryPicker from '../../../components/CountryPicker';
import Input from '../../../components/Input';
import { RouteStack } from '../../../navigation/types';
import { facebookLogin } from '../../../utils/AuthHelper';
import Storage, { StorageKeys } from '../../../utils/storage';
import AuthScreenWrapper from '../AuthScreenWrapper';
import styles from './style';

const SignIn = () => {
  const navigation = useNavigation<RouteStack>();
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [selectedTab, setSelectedTab] = useState<'email' | 'phone'>('email');
  const dispatch = useDispatch();
  const token = 'user_token@123';

  const handleSignIn = () => {
    Storage.setItem(StorageKeys.USER_TOKEN, token);
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
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'email' && styles.activeTab]}
          onPress={() => {
            setSelectedTab('email');
            setInputValue('');
          }}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'email' && styles.activeTabText,
            ]}
          >
            Email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'phone' && styles.activeTab]}
          onPress={() => {
            setSelectedTab('phone');
            setInputValue('');
          }}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'phone' && styles.activeTabText,
            ]}
          >
            Phone
          </Text>
        </TouchableOpacity>
      </View>

      <Input
        suffix={
          selectedTab === 'phone' ? (
            <CountryPicker
            // onSelectCountry={handleChange("countryCode")}
            />
          ) : undefined
        }
        label={selectedTab === 'phone' ? 'Phone Number' : 'Email Address'}
        keyboardType={selectedTab === 'phone' ? 'phone-pad' : 'email-address'}
        value={inputValue}
        onChangeText={setInputValue}
        maxLength={selectedTab === 'phone' ? 15 : undefined}
        placeholder={
          selectedTab === 'phone' ? '000-000-0000' : 'Enter your email'
        }
      />
      <View style={{ marginTop: 12 }} />
      <Input
        label="Password"
        secureText={true}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
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
    </AuthScreenWrapper>
  );
};

export default SignIn;
