import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import FacebookIcon from '../../../assets/icons/facebook.png';
import InstagramIcon from '../../../assets/icons/instagram.png';
import YoutubeIcon from '../../../assets/icons/youtube.png';
import { Logo } from '../../../assets/images';
import Button from '../../../components/Button';
import Container from '../../../components/Container';
import CountryPicker from '../../../components/CountryPicker';
import Input from '../../../components/Input';
import { RouteStack } from '../../../navigation/types';
import { facebookLogin } from '../../../utils/AuthHelper';
import Storage, { StorageKeys } from '../../../utils/storage';
import styles from './style';

const SignIn = () => {
  const navigation = useNavigation<RouteStack>();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
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
    <Container>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
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

          <Button
            title="Sign In"
            onPress={handleSignIn}
            style={styles.button}
          />

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
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Terms & Conditions & Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
};

export default SignIn;
