import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button';
import CountryPicker from '../../../components/CountryPicker';
import Input from '../../../components/Input';
import { RouteStack } from '../../../navigation/types';
import { registerUser } from '../../../redux/AuthSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { verticalScale } from '../../../utils/scale';
import AuthScreenWrapper from '../AuthScreenWrapper';
import styles from './style';

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const navigation = useNavigation<RouteStack>();
  const [phoneValue, setPhoneValue] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const clearFieldError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleSignUp = () => {
    setErrors({});

    if (!firstName.trim()) {
      setErrors(prev => ({ ...prev, firstName: 'First Name is required' }));
      return;
    }
    if (!lastName.trim()) {
      setErrors(prev => ({ ...prev, lastName: 'Last Name is required' }));
      return;
    }
    if (!email.trim() && !phoneValue.trim()) {
      setErrors(prev => ({
        ...prev,
        email: 'Email or Phone is required',
        phone: 'Email or Phone is required',
      }));
      return;
    }
    if (!password.trim()) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      return;
    }

    const payload: any = {
      first_name: firstName,
      last_name: lastName,
      password,
      role: 'user',
    };

    if (email.trim()) payload.email = email.trim().toLowerCase();
    if (phoneValue.trim()) payload.phoneNumber = phoneValue.trim();
    if (phoneValue.trim()) payload.countryCode = countryCode;

    dispatch(registerUser(payload));
  };

  return (
    <AuthScreenWrapper heading="Sign Up">
      <Input
        label="Phone Number"
        value={phoneValue}
        keyboardType="phone-pad"
        maxLength={10}
        placeholder="000-000-0000"
        suffix={
          <CountryPicker
            onSelectCountry={dialCode => setCountryCode(dialCode)}
          />
        }
        onChangeText={text => {
          setPhoneValue(text);
          clearFieldError('phone');
        }}
        error={errors.phone}
      />

      <Input
        label="Email Address"
        value={email}
        keyboardType="email-address"
        placeholder="Enter your email"
        onChangeText={text => {
          setEmail(text);
          clearFieldError('email');
        }}
        error={errors.email}
      />

      <Input
        label="First Name"
        value={firstName}
        placeholder="Enter First Name"
        onChangeText={text => {
          setFirstName(text);
          clearFieldError('firstName');
        }}
        error={errors.firstName}
      />

      <Input
        label="Last Name"
        value={lastName}
        placeholder="Enter Last Name"
        onChangeText={text => {
          setLastName(text);
          clearFieldError('lastName');
        }}
        error={errors.lastName}
      />

      <Input
        label="Password"
        value={password}
        placeholder="Enter your password"
        secureTextEntry
        onChangeText={text => {
          setPassword(text);
          clearFieldError('password');
        }}
        error={errors.password}
      />

      <Button
        title="Sign Up"
        onPress={handleSignUp}
        disabled={isLoading}
        loading={isLoading}
        style={{ marginTop: verticalScale(20) }}
      />

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.goBack()}
        disabled={isLoading}
      >
        <Text style={styles.signUpText}>Sign in</Text>
      </TouchableOpacity>
    </AuthScreenWrapper>
  );
};

export default SignUp;
